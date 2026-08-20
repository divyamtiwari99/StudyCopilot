import { aiConfig } from "../config/ai.config.js";
import {
  AIProviderError,
  classifyProviderError,
} from "./provider.error.js";
import type {
  AIImageInput,
  AIProvider,
  AIProviderResult,
  AITextInput,
} from "../types/provider.types.js";
import { env } from "../../../config/env.js";

interface GroqChatResponse {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;

  error?: {
    message?: string;
    type?: string;
    code?: string;
  };
}

function sleep(ms: number, signal?: AbortSignal) {
  if (signal?.aborted) {
    return Promise.reject(new Error("AI request aborted."));
  }

  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, ms);

    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new Error("AI request aborted."));
      },
      { once: true },
    );
  });
}

function retryAfterToMs(response: Response | undefined): number | undefined {
  const retryAfter = response?.headers.get("retry-after");

  if (!retryAfter) {
    return undefined;
  }

  const seconds = Number(retryAfter);

  if (Number.isFinite(seconds) && seconds >= 0) {
    return Math.min(60_000, Math.max(0, seconds * 1000));
  }

  const date = Date.parse(retryAfter);

  return Number.isFinite(date)
    ? Math.min(60_000, Math.max(0, date - Date.now()))
    : undefined;
}

function retryDelayMs(
  response: Response | undefined,
  attempt: number,
): number {
  const retryAfter = response?.headers.get("retry-after");

  if (retryAfter) {
    const seconds = Number(retryAfter);

    if (Number.isFinite(seconds) && seconds >= 0) {
      return Math.min(
        15_000,
        Math.max(250, seconds * 1000),
      );
    }

    const date = Date.parse(retryAfter);

    if (Number.isFinite(date)) {
      return Math.min(
        15_000,
        Math.max(250, date - Date.now()),
      );
    }
  }

  return Math.min(8_000, 500 * 2 ** attempt);
}

export class GroqProvider implements AIProvider {
  readonly name = "groq" as const;

  readonly textModel = aiConfig.groqTextModel;

  readonly visionModel = aiConfig.groqVisionModel;

  private async request(
    body: Record<string, unknown>,
    signal?: AbortSignal,
  ): Promise<GroqChatResponse> {
    if (!env.GROQ_API_KEY) {
      throw new AIProviderError(
        "groq",
        "authentication",
        "AI service configuration error.",
        502,
      );
    }

    let lastError: unknown;

    for (
      let attempt = 0;
      attempt <= aiConfig.maxRetries;
      attempt += 1
    ) {
      try {
        const response = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${env.GROQ_API_KEY}`,
            },

            body: JSON.stringify(body),

            signal,
          },
        );

        const payload = (await response
          .json()
          .catch(() => ({}))) as GroqChatResponse;

        if (response.ok) {
          return payload;
        }

        const providerMessage =
          payload.error?.message ??
          `Groq request failed with status ${response.status}.`;

        const classified = classifyProviderError("groq", {
          status: response.status,
          message: providerMessage,
          code: payload.error?.code,
          type: payload.error?.type,
          retryAfterMs: retryAfterToMs(response),
        });

        if (
          classified.code === "rate_limit" ||
          classified.code === "quota_exhausted"
        ) {
          throw classified;
        }

        if (
          classified.retryable &&
          attempt < aiConfig.maxRetries
        ) {
          await sleep(
            retryDelayMs(response, attempt),
            signal,
          );

          continue;
        }

        throw classified;
      } catch (error) {
        if (signal?.aborted) {
          throw new AIProviderError(
            "groq",
            "timeout",
            "The AI request timed out. Please try again.",
            504,
            true,
          );
        }

        lastError = error;

        if (
          error instanceof AIProviderError &&
          !error.retryable
        ) {
          throw error;
        }

        const classified =
          error instanceof AIProviderError
            ? error
            : classifyProviderError("groq", error);

        if (
          classified.code === "rate_limit" ||
          classified.code === "quota_exhausted"
        ) {
          throw classified;
        }

        if (
          classified.retryable &&
          attempt < aiConfig.maxRetries
        ) {
          await sleep(
            retryDelayMs(undefined, attempt),
            signal,
          );

          continue;
        }

        throw classified;
      }
    }

    throw classifyProviderError("groq", lastError);
  }

  private async requestStream(
    body: Record<string, unknown>,
    signal?: AbortSignal,
  ): Promise<Response> {
    if (!env.GROQ_API_KEY) {
      throw new AIProviderError(
        "groq",
        "authentication",
        "AI service configuration error.",
        502,
      );
    }

    for (
      let attempt = 0;
      attempt <= aiConfig.maxRetries;
      attempt += 1
    ) {
      try {
        const response = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${env.GROQ_API_KEY}`,
            },

            body: JSON.stringify({
              ...body,
              stream: true,
            }),

            signal,
          },
        );

        if (response.ok) {
          return response;
        }

        const payload = (await response
          .json()
          .catch(() => ({}))) as GroqChatResponse;

        const classified = classifyProviderError("groq", {
          status: response.status,

          message:
            payload.error?.message ??
            `Groq request failed with status ${response.status}.`,

          code: payload.error?.code,

          type: payload.error?.type,

          retryAfterMs: retryAfterToMs(response),
        });

        if (
          classified.code === "rate_limit" ||
          classified.code === "quota_exhausted"
        ) {
          throw classified;
        }

        if (
          classified.retryable &&
          attempt < aiConfig.maxRetries
        ) {
          await sleep(
            retryDelayMs(response, attempt),
            signal,
          );

          continue;
        }

        throw classified;
      } catch (error) {
        if (signal?.aborted) {
          throw new AIProviderError(
            "groq",
            "timeout",
            "The AI request timed out. Please try again.",
            504,
            true,
          );
        }

        if (
          error instanceof AIProviderError &&
          !error.retryable
        ) {
          throw error;
        }

        const classified =
          error instanceof AIProviderError
            ? error
            : classifyProviderError("groq", error);

        if (
          classified.code === "rate_limit" ||
          classified.code === "quota_exhausted"
        ) {
          throw classified;
        }

        if (
          classified.retryable &&
          attempt < aiConfig.maxRetries
        ) {
          await sleep(
            retryDelayMs(undefined, attempt),
            signal,
          );

          continue;
        }

        throw classified;
      }
    }

    throw new AIProviderError(
      "groq",
      "unavailable",
      "AI provider is temporarily unavailable. Please try again.",
      503,
      true,
    );
  }

  private reasoningOptions(
    model: string,
    deepReasoning = false,
  ): Record<string, unknown> {
    if (model === "openai/gpt-oss-20b") {
      return {
        include_reasoning: false,
        reasoning_effort: deepReasoning ? "high" : "low",
      };
    }

    if (model === "qwen/qwen3.6-27b") {
      return {
        reasoning_format: "hidden",
        reasoning_effort: deepReasoning
          ? "default"
          : "none",
      };
    }

    return {};
  }

  private extractText(
    response: GroqChatResponse,
  ): string {
    const text =
      response.choices?.[0]?.message?.content?.trim();

    if (!text) {
      throw new AIProviderError(
        "groq",
        "unavailable",
        "AI provider returned an empty response.",
        503,
        true,
      );
    }

    return text;
  }

  async generateText({
    prompt,
    maxOutputTokens = 2048,
    temperature,
    deepReasoning,
    jsonMode,
    signal,
  }: AITextInput): Promise<AIProviderResult> {
    const response = await this.request(
      {
        model: this.textModel,

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        max_completion_tokens: maxOutputTokens,

        ...(temperature !== undefined
          ? { temperature }
          : {}),

        stream: false,

        ...this.reasoningOptions(
          this.textModel,
          deepReasoning,
        ),

        // IMPORTANT:
        // Force Groq to return valid JSON when requested.
        ...(jsonMode
          ? {
              response_format: {
                type: "json_object",
              },
            }
          : {}),
      },
      signal,
    );

    return {
      text: this.extractText(response),

      provider: this.name,

      model: this.textModel,
    };
  }

  async generateWithImage({
    prompt,
    images,
    maxOutputTokens = 2048,
    temperature,
    deepReasoning,
    signal,
  }: AIImageInput): Promise<AIProviderResult> {
    const response = await this.request(
      {
        model: this.visionModel,

        messages: [
          {
            role: "user",

            content: [
              {
                type: "text",
                text: prompt,
              },

              ...images.map((image) => ({
                type: "image_url",

                image_url: {
                  url:
                    image.url ??
                    `data:${image.mimeType};base64,${image.data.toString(
                      "base64",
                    )}`,
                },
              })),
            ],
          },
        ],

        max_completion_tokens: maxOutputTokens,

        ...(temperature !== undefined
          ? { temperature }
          : {}),

        stream: false,

        ...this.reasoningOptions(
          this.visionModel,
          deepReasoning,
        ),
      },
      signal,
    );

    return {
      text: this.extractText(response),

      provider: this.name,

      model: this.visionModel,
    };
  }

  async *streamText({
    prompt,
    maxOutputTokens = 2048,
    temperature,
    deepReasoning,
    signal,
  }: AITextInput): AsyncGenerator<string> {
    const response = await this.requestStream(
      {
        model: this.textModel,

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        max_completion_tokens: maxOutputTokens,

        ...(temperature !== undefined
          ? { temperature }
          : {}),

        ...this.reasoningOptions(
          this.textModel,
          deepReasoning,
        ),
      },
      signal,
    );

    if (!response.body) {
      throw new AIProviderError(
        "groq",
        "unavailable",
        "Groq returned an empty stream.",
        503,
        true,
      );
    }

    const reader = response.body.getReader();

    const decoder = new TextDecoder();

    let buffer = "";

    try {
      while (true) {
        const { value, done } =
          await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, {
          stream: true,
        });

        const lines = buffer.split("\n");

        buffer = lines.pop() ?? "";

        for (const rawLine of lines) {
          const line = rawLine.trim();

          if (
            !line ||
            !line.startsWith("data:")
          ) {
            continue;
          }

          const data = line.slice(5).trim();

          if (data === "[DONE]") {
            return;
          }

          try {
            const chunk = JSON.parse(data) as {
              choices?: Array<{
                delta?: {
                  content?: string | null;
                };
              }>;
            };

            const text =
              chunk.choices?.[0]?.delta?.content;

            if (text) {
              yield text;
            }
          } catch {
            // Ignore malformed SSE chunks.
          }
        }
      }
    } catch (error) {
      throw error instanceof AIProviderError
        ? error
        : classifyProviderError("groq", error);
    } finally {
      reader.releaseLock();
    }
  }
}

export const groqProvider = new GroqProvider();