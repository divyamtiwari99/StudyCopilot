import {
  GoogleGenAI,
  ThinkingLevel,
} from "@google/genai";

import { env } from "../../../config/env.js";
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

export const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

function sleep(
  ms: number,
  signal?: AbortSignal,
) {
  if (signal?.aborted) {
    return Promise.reject(
      new Error("AI request aborted."),
    );
  }

  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, ms);

    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);

        reject(
          new Error("AI request aborted."),
        );
      },
      { once: true },
    );
  });
}

export class GeminiProvider
  implements AIProvider
{
  readonly name = "gemini" as const;

  readonly textModel =
    aiConfig.geminiTextModel;

  readonly visionModel =
    aiConfig.geminiTextModel;

  readonly client = gemini;

  private generationConfig(
    maxOutputTokens: number,
    signal?: AbortSignal,
    deepReasoning = false,
    jsonMode = false,
  ) {
    return {
      maxOutputTokens,

      abortSignal: signal,

      thinkingConfig: {
        thinkingLevel: deepReasoning
          ? ThinkingLevel.HIGH
          : ThinkingLevel.LOW,
      },

      ...(jsonMode
        ? {
            responseMimeType:
              "application/json",
          }
        : {}),
    };
  }

  async generateText({
    prompt,
    maxOutputTokens = 2048,
    deepReasoning,
    jsonMode,
    signal,
  }: AITextInput): Promise<AIProviderResult> {
    try {
      const response =
        await this.client.models.generateContent(
          {
            model: this.textModel,

            contents: prompt,

            config: this.generationConfig(
              maxOutputTokens,
              signal,
              deepReasoning,
              jsonMode,
            ),
          },
        );

      const text =
        response.text?.trim() ?? "";

      if (!text) {
        throw new Error(
          "Gemini returned an empty response.",
        );
      }

      return {
        text,
        provider: this.name,
        model: this.textModel,
      };
    } catch (error) {
      throw classifyProviderError(
        "gemini",
        error,
      );
    }
  }

  async generateWithImage({
    prompt,
    images,
    maxOutputTokens = 2048,
    deepReasoning,
    signal,
  }: AIImageInput): Promise<AIProviderResult> {
    try {
      const response =
        await this.client.models.generateContent(
          {
            model: this.visionModel,

            contents: [
              {
                role: "user",

                parts: [
                  {
                    text: prompt,
                  },

                  ...images.map((image) => ({
                    inlineData: {
                      mimeType:
                        image.mimeType,

                      data: image.data.toString(
                        "base64",
                      ),
                    },
                  })),
                ],
              },
            ],

            config: this.generationConfig(
              maxOutputTokens,
              signal,
              deepReasoning,
            ),
          },
        );

      const text =
        response.text?.trim() ?? "";

      if (!text) {
        throw new Error(
          "Gemini returned an empty response.",
        );
      }

      return {
        text,
        provider: this.name,
        model: this.visionModel,
      };
    } catch (error) {
      throw classifyProviderError(
        "gemini",
        error,
      );
    }
  }

  async generateEmbedding(
    text: string,
    signal?: AbortSignal,
  ): Promise<number[]> {
    if (!text.trim()) {
      throw new AIProviderError(
        "gemini",
        "bad_request",
        "Embedding text cannot be empty.",
        400,
      );
    }

    let lastError: unknown;

    for (
      let attempt = 0;
      attempt <= aiConfig.maxRetries;
      attempt += 1
    ) {
      try {
        const response =
          await this.client.models.embedContent(
            {
              model:
                aiConfig.geminiEmbeddingModel,

              contents: text,

              config: {
                abortSignal: signal,
              },
            },
          );

        const values =
          response.embeddings?.[0]
            ?.values ?? [];

        if (!values.length) {
          throw new AIProviderError(
            "gemini",
            "unavailable",
            "Gemini returned an empty embedding.",
            503,
            true,
          );
        }

        return values;
      } catch (error) {
        if (signal?.aborted) {
          throw new AIProviderError(
            "gemini",
            "timeout",
            "The AI request timed out. Please try again.",
            504,
            true,
          );
        }

        const classified =
          error instanceof AIProviderError
            ? error
            : classifyProviderError(
                "gemini",
                error,
              );

        lastError = classified;

        if (
          !classified.retryable ||
          attempt >= aiConfig.maxRetries
        ) {
          throw classified;
        }

        await sleep(
          250 * 2 ** attempt,
          signal,
        );
      }
    }

    throw classifyProviderError(
      "gemini",
      lastError,
    );
  }

  async *streamText({
    prompt,
    maxOutputTokens = 2048,
    deepReasoning,
    signal,
  }: AITextInput): AsyncGenerator<string> {
    try {
      const response =
        await this.client.models.generateContentStream(
          {
            model: this.textModel,

            contents: prompt,

            config: this.generationConfig(
              maxOutputTokens,
              signal,
              deepReasoning,
            ),
          },
        );

      for await (const chunk of response) {
        if (chunk.text) {
          yield chunk.text;
        }
      }
    } catch (error) {
      throw classifyProviderError(
        "gemini",
        error,
      );
    }
  }
}

export const geminiProvider =
  new GeminiProvider();