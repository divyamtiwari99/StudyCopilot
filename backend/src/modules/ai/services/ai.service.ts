import { geminiProvider } from "../providers/gemini.provider.js";
import { groqProvider } from "../providers/groq.provider.js";
import {
  AIProviderError,
  classifyProviderError,
} from "../providers/provider.error.js";
import { aiConfig } from "../config/ai.config.js";

import type {
  AIProviderName,
  AIProviderResult,
} from "../types/provider.types.js";

import { randomUUID } from "node:crypto";
import mongoose from "mongoose";

import {
  AiConcurrencyLeaseModel,
} from "../models/ai-concurrency-lease.model.js";

import { RateLimitError } from "../../../core/errors/rate-limit.error.js";

export interface GenerateTextOptions {
  prompt: string;
  temperature?: number;
  maxOutputTokens?: number;
  provider?: AIProviderName;
  fallback?: boolean;
  userId?: string;
  deepReasoning?: boolean;

  /**
   * Ask the provider for machine-readable JSON.
   */
  jsonMode?: boolean;
}

export interface GenerateMultimodalOptions
  extends GenerateTextOptions {
  images: Array<{
    mimeType: string;
    data: Buffer;
    url?: string;
  }>;
}

export interface GenerateResult
  extends AIProviderResult {
  fallbackFrom?: AIProviderName;
  attemptedProviders?: AIProviderName[];
}

export class AIService {
  private getProvider(
    name: AIProviderName,
  ) {
    return name === "groq"
      ? groqProvider
      : geminiProvider;
  }

  private shouldFallback(
    error: unknown,
  ): boolean {
    if (!(error instanceof AIProviderError)) {
      return false;
    }

    return (
      error.retryable ||
      [
        "rate_limit",
        "quota_exhausted",
        "authentication",
        "authorization",
        "invalid_model",
        "unsupported_input",
      ].includes(error.code)
    );
  }

  private async acquireConcurrencyLease(
    userId: string,
    provider: AIProviderName,
  ): Promise<string> {
    const now = new Date();

    const expiresAt = new Date(
      Date.now() +
        aiConfig.requestTimeoutMs +
        30_000,
    );

    const leaseId = randomUUID();

    for (
      let slot = 0;
      slot <
      aiConfig.maxConcurrentAiPerUser;
      slot += 1
    ) {
      try {
        const lease =
          await AiConcurrencyLeaseModel.findOneAndUpdate(
            {
              userId,
              slot,

              $or: [
                {
                  expiresAt: {
                    $lte: now,
                  },
                },
                {
                  leaseId: {
                    $exists: false,
                  },
                },
              ],
            },

            {
              $set: {
                leaseId,
                expiresAt,
              },
            },

            {
              upsert: true,
              new: true,
              setDefaultsOnInsert: true,
            },
          ).lean();

        if (
          lease?.leaseId === leaseId
        ) {
          return leaseId;
        }
      } catch (error) {
        if (
          !(
            error instanceof
            mongoose.mongo.MongoServerError
          ) ||
          error.code !== 11000
        ) {
          throw error;
        }
      }
    }

    throw new RateLimitError(
      "You have too many AI requests running at once. Please wait for one to finish.",
      "app_concurrency_limit",
      1_000,
    );
  }

  private async releaseConcurrencyLease(
    userId: string,
    leaseId: string,
  ): Promise<void> {
    await AiConcurrencyLeaseModel
      .deleteOne({
        userId,
        leaseId,
      })
      .catch(() => undefined);
  }

  private async withConcurrency<T>(
    userId: string | undefined,
    provider: AIProviderName,
    operation: () => Promise<T>,
  ): Promise<T> {
    if (!userId) {
      return operation();
    }

    const leaseId =
      await this.acquireConcurrencyLease(
        userId,
        provider,
      );

    try {
      return await operation();
    } finally {
      await this.releaseConcurrencyLease(
        userId,
        leaseId,
      );
    }
  }

  private async executeWithTimeout<T>(
    provider: AIProviderName,
    operation: (
      signal: AbortSignal,
    ) => Promise<T>,
  ): Promise<T> {
    const controller =
      new AbortController();

    let timer:
      | ReturnType<typeof setTimeout>
      | undefined;

    const timeoutPromise =
      new Promise<never>(
        (_, reject) => {
          timer = setTimeout(() => {
            controller.abort();

            reject(
              new AIProviderError(
                provider,
                "timeout",
                "The AI request timed out. Please try again.",
                504,
                true,
              ),
            );
          }, aiConfig.requestTimeoutMs);
        },
      );

    try {
      return await Promise.race([
        operation(controller.signal),
        timeoutPromise,
      ]);
    } catch (error) {
      if (
        error instanceof AIProviderError
      ) {
        throw error;
      }

      if (controller.signal.aborted) {
        throw new AIProviderError(
          provider,
          "timeout",
          "The AI request timed out. Please try again.",
          504,
          true,
        );
      }

      throw classifyProviderError(
        provider,
        error,
      );
    } finally {
      if (timer) {
        clearTimeout(timer);
      }
    }
  }

  private async callText(
    provider: AIProviderName,
    options: GenerateTextOptions,
  ) {
    return this.executeWithTimeout(
      provider,
      (signal) =>
        this.getProvider(
          provider,
        ).generateText({
          prompt: options.prompt,

          maxOutputTokens:
            options.maxOutputTokens,

          temperature:
            options.temperature,

          deepReasoning:
            options.deepReasoning,

          // IMPORTANT:
          // Forward JSON mode to the provider.
          jsonMode:
            options.jsonMode,

          signal,
        }),
    );
  }

  async generateTextDetailed(
    options: GenerateTextOptions,
  ): Promise<GenerateResult> {
    const provider =
      options.provider ??
      aiConfig.chatProvider;

    const boundedOptions = {
      ...options,

      maxOutputTokens:
        options.maxOutputTokens ?? 2048,
    };

    return this.withConcurrency(
      options.userId,
      provider,
      async () => {
        const fallback =
          options.fallback ?? true;

        try {
          const result =
            await this.callText(
              provider,
              boundedOptions,
            );

          return {
            ...result,
            attemptedProviders: [
              provider,
            ],
          };
        } catch (error) {
          const primaryError =
            error instanceof AIProviderError
              ? error
              : classifyProviderError(
                  provider,
                  error,
                );

          if (
            !fallback ||
            !this.shouldFallback(
              primaryError,
            )
          ) {
            throw primaryError;
          }

          const fallbackProvider: AIProviderName =
            provider === "groq"
              ? "gemini"
              : "groq";

          try {
            const result =
              await this.callText(
                fallbackProvider,
                boundedOptions,
              );

            return {
              ...result,

              fallbackFrom: provider,

              attemptedProviders: [
                provider,
                fallbackProvider,
              ],
            };
          } catch (
            fallbackError
          ) {
            const finalError =
              fallbackError instanceof
              AIProviderError
                ? fallbackError
                : classifyProviderError(
                    fallbackProvider,
                    fallbackError,
                  );

            finalError.attemptedProviders =
              [
                provider,
                fallbackProvider,
              ];

            throw new AIProviderError(
              fallbackProvider,

              finalError.code,

              `Both AI providers failed. ${provider}: ${primaryError.message} ${fallbackProvider}: ${finalError.message}`,

              finalError.statusCode >= 500
                ? 503
                : finalError.statusCode,

              finalError.retryable,

              finalError.retryAfterMs,
            );
          }
        }
      },
    );
  }

  async generateText(
    options: GenerateTextOptions,
  ): Promise<string> {
    return (
      await this.generateTextDetailed(
        options,
      )
    ).text;
  }

  async generateMultimodalDetailed(
    options: GenerateMultimodalOptions,
  ): Promise<GenerateResult> {
    if (!options.images.length) {
      throw new AIProviderError(
        options.provider ??
          aiConfig.visionProvider,

        "unsupported_input",

        "At least one image is required.",

        400,
      );
    }

    const provider =
      options.provider ??
      aiConfig.visionProvider;

    const boundedOptions = {
      ...options,

      maxOutputTokens:
        options.maxOutputTokens ?? 1600,
    };

    return this.withConcurrency(
      options.userId,
      provider,
      async () => {
        const fallback =
          options.fallback ?? true;

        try {
          const result =
            await this.executeWithTimeout(
              provider,
              (signal) =>
                this.getProvider(
                  provider,
                ).generateWithImage({
                  prompt: options.prompt,

                  images: options.images,

                  maxOutputTokens:
                    boundedOptions.maxOutputTokens,

                  temperature:
                    boundedOptions.temperature,

                  deepReasoning:
                    boundedOptions.deepReasoning,

                  jsonMode:
                    boundedOptions.jsonMode,

                  signal,
                }),
            );

          return {
            ...result,
            attemptedProviders: [
              provider,
            ],
          };
        } catch (error) {
          const primaryError =
            error instanceof AIProviderError
              ? error
              : classifyProviderError(
                  provider,
                  error,
                );

          if (
            !fallback ||
            !this.shouldFallback(
              primaryError,
            )
          ) {
            throw primaryError;
          }

          const fallbackProvider: AIProviderName =
            provider === "gemini"
              ? "groq"
              : "gemini";

          try {
            const result =
              await this.executeWithTimeout(
                fallbackProvider,
                (signal) =>
                  this.getProvider(
                    fallbackProvider,
                  ).generateWithImage({
                    prompt: options.prompt,

                    images: options.images,

                    maxOutputTokens:
                      boundedOptions.maxOutputTokens,

                    temperature:
                      boundedOptions.temperature,

                    deepReasoning:
                      boundedOptions.deepReasoning,

                    jsonMode:
                      boundedOptions.jsonMode,

                    signal,
                  }),
              );

            return {
              ...result,

              fallbackFrom: provider,

              attemptedProviders: [
                provider,
                fallbackProvider,
              ],
            };
          } catch (
            fallbackError
          ) {
            const finalError =
              fallbackError instanceof
              AIProviderError
                ? fallbackError
                : classifyProviderError(
                    fallbackProvider,
                    fallbackError,
                  );

            finalError.attemptedProviders =
              [
                provider,
                fallbackProvider,
              ];

            throw new AIProviderError(
              fallbackProvider,

              finalError.code,

              `Both AI providers failed. ${provider}: ${primaryError.message} ${fallbackProvider}: ${finalError.message}`,

              finalError.statusCode >= 500
                ? 503
                : finalError.statusCode,

              finalError.retryable,

              finalError.retryAfterMs,
            );
          }
        }
      },
    );
  }

  async *streamText(
    options: GenerateTextOptions,
  ): AsyncGenerator<string> {
    const provider =
      options.provider ??
      aiConfig.chatProvider;

    const fallback =
      options.fallback ?? true;

    let yielded = false;

    const run = async function* (
      self: AIService,
      name: AIProviderName,
    ) {
      const controller =
        new AbortController();

      const timer = setTimeout(
        () => controller.abort(),
        aiConfig.requestTimeoutMs,
      );

      let providerYielded = false;

      try {
        for await (
          const chunk of self
            .getProvider(name)
            .streamText({
              prompt: options.prompt,

              maxOutputTokens:
                options.maxOutputTokens,

              temperature:
                options.temperature,

              deepReasoning:
                options.deepReasoning,

              jsonMode:
                options.jsonMode,

              signal:
                controller.signal,
            })
        ) {
          yielded = true;
          providerYielded = true;

          yield chunk;
        }

        if (!providerYielded) {
          throw new AIProviderError(
            name,
            "unavailable",
            "AI provider returned an empty stream.",
            503,
            true,
          );
        }
      } catch (error) {
        if (
          controller.signal.aborted
        ) {
          throw new AIProviderError(
            name,
            "timeout",
            "The AI request timed out. Please try again.",
            504,
            true,
          );
        }

        throw error instanceof AIProviderError
          ? error
          : classifyProviderError(
              name,
              error,
            );
      } finally {
        clearTimeout(timer);
      }
    };

    const runWithConcurrency =
      async function* (
        self: AIService,
        name: AIProviderName,
      ) {
        if (!options.userId) {
          yield* run(self, name);
          return;
        }

        const leaseId =
          await self.acquireConcurrencyLease(
            options.userId,
            name,
          );

        try {
          yield* run(self, name);
        } finally {
          await self.releaseConcurrencyLease(
            options.userId,
            leaseId,
          );
        }
      };

    try {
      yield* runWithConcurrency(
        this,
        provider,
      );
    } catch (error) {
      if (
        !fallback ||
        yielded ||
        !this.shouldFallback(error)
      ) {
        throw error;
      }

      const fallbackProvider: AIProviderName =
        provider === "groq"
          ? "gemini"
          : "groq";

      yield* runWithConcurrency(
        this,
        fallbackProvider,
      );
    }
  }
}

export const aiService =
  new AIService();