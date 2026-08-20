import { z } from "zod";
import { randomUUID } from "node:crypto";

import { AppError } from "../../../core/errors/app.error.js";

import {
  AiGenerationLockModel,
} from "../models/ai-generation-lock.model.js";

import { Types } from "mongoose";

import {
  NotFoundError,
} from "../../../core/errors/not-found.error.js";

import {
  ValidationError,
} from "../../../core/errors/validation.error.js";

import {
  ChunkModel,
} from "../../content/models/chunk.model.js";

import {
  ContentModel,
} from "../../content/models/content.model.js";

import type {
  GenerateResult,
} from "./ai.service.js";

const MAX_AI_DOCUMENT_CHARS = 12_000;

export const flashcardsSchema =
  z
    .array(
      z.object({
        question: z
          .string()
          .min(1)
          .max(1000),

        answer: z
          .string()
          .min(1)
          .max(3000),
      }),
    )
    .min(1)
    .max(100);

export const quizSchema =
  z
    .array(
      z.object({
        question: z
          .string()
          .min(1)
          .max(1500),

        options: z
          .array(
            z
              .string()
              .min(1)
              .max(500),
          )
          .length(4),

        correctAnswer: z
          .number()
          .int()
          .min(0)
          .max(3),

        explanation: z
          .string()
          .min(1)
          .max(1500),
      }),
    )
    .length(10);

const knowledgeNodeSchema =
  z.object({
    id: z
      .string()
      .min(1)
      .max(120),

    label: z
      .string()
      .min(1)
      .max(300),

    category: z
      .string()
      .min(1)
      .max(120),

    description: z
      .string()
      .min(1)
      .max(1200),
  });

export const knowledgeGraphSchema =
  z
    .object({
      nodes: z
        .array(knowledgeNodeSchema)
        .max(30),

      edges: z
        .array(
          z.object({
            source: z
              .string()
              .min(1)
              .max(120),

            target: z
              .string()
              .min(1)
              .max(120),

            relationship: z
              .string()
              .min(1)
              .max(120),
          }),
        )
        .max(100),
    })
    .superRefine(
      (graph, ctx) => {
        const ids = new Set(
          graph.nodes.map(
            (node) => node.id,
          ),
        );

        for (const edge of graph.edges) {
          if (
            !ids.has(edge.source) ||
            !ids.has(edge.target)
          ) {
            ctx.addIssue({
              code: "custom",

              message:
                "Knowledge graph edge references an unknown node.",
            });

            break;
          }
        }
      },
    );

export const roadmapSchema =
  z.object({
    phases: z
      .array(
        z.object({
          title: z
            .string()
            .min(1)
            .max(300),

          description: z
            .string()
            .min(1)
            .max(1500),

          topics: z
            .array(
              z.object({
                title: z
                  .string()
                  .min(1)
                  .max(300),

                description: z
                  .string()
                  .min(1)
                  .max(1500),

                difficulty: z.enum([
                  "Beginner",
                  "Intermediate",
                  "Advanced",
                ]),

                estimatedTime: z
                  .string()
                  .min(1)
                  .max(100),

                prerequisites: z
                  .array(
                    z
                      .string()
                      .max(300),
                  )
                  .max(20),
              }),
            )
            .max(50),
        }),
      )
      .max(20),
  });

export const studyPlannerSchema =
  z.object({
    overview: z.object({
      estimatedDays: z
        .number()
        .int()
        .nonnegative()
        .max(365),

      dailyStudyHours: z
        .string()
        .max(100),

      totalTopics: z
        .number()
        .int()
        .nonnegative()
        .max(1000),
    }),

    days: z
      .array(
        z.object({
          day: z
            .number()
            .int()
            .positive()
            .max(365),

          title: z
            .string()
            .min(1)
            .max(300),

          estimatedTime: z
            .string()
            .min(1)
            .max(100),

          tasks: z
            .array(
              z.object({
                title: z
                  .string()
                  .min(1)
                  .max(300),

                description: z
                  .string()
                  .min(1)
                  .max(1500),

                difficulty: z.enum([
                  "Beginner",
                  "Intermediate",
                  "Advanced",
                ]),
              }),
            )
            .max(30),

          revision: z.boolean(),

          quiz: z.boolean(),
        }),
      )
      .max(365),
  });

export async function getOwnedContent(
  contentId: string,
  userId: string,
) {
  if (
    !Types.ObjectId.isValid(
      contentId,
    )
  ) {
    throw new ValidationError(
      "Invalid content ID.",
    );
  }

  const content =
    await ContentModel.findOne({
      _id: contentId,
      userId,
    });

  if (!content) {
    throw new NotFoundError(
      "Content not found.",
    );
  }

  return content;
}

export async function getOwnedDocumentText(
  contentId: string,
  userId: string,
) {
  const content =
    await getOwnedContent(
      contentId,
      userId,
    );

  if (
    content.status !== "completed"
  ) {
    throw new ValidationError(
      "Document is still being processed. Please try again when it is ready.",
    );
  }

  const chunks =
    await ChunkModel.find({
      contentId,
    })
      .sort({ order: 1 })
      .select("text")
      .lean();

  if (!chunks.length) {
    throw new ValidationError(
      "Document has not been processed yet.",
    );
  }

  const totalLength =
    chunks.reduce(
      (sum, chunk) =>
        sum + chunk.text.length + 2,
      0,
    );

  if (
    totalLength <=
    MAX_AI_DOCUMENT_CHARS
  ) {
    const output = chunks
      .map(
        (chunk) => chunk.text,
      )
      .join("\n\n");

    if (!output.trim()) {
      throw new ValidationError(
        "Document does not contain usable text.",
      );
    }

    return output;
  }

  /*
   * Large documents can exceed provider
   * token limits.
   *
   * Pick representative chunks instead
   * of sending the entire document.
   */
  const selectedIndexes =
    new Set<number>([
      0,
      1,
      chunks.length - 2,
      chunks.length - 1,
    ]);

  const middleCount = Math.max(
    0,
    Math.min(
      3,
      chunks.length -
        selectedIndexes.size,
    ),
  );

  for (
    let index = 1;
    index <= middleCount;
    index += 1
  ) {
    selectedIndexes.add(
      Math.floor(
        (index *
          (chunks.length - 1)) /
          (middleCount + 1),
      ),
    );
  }

  const selected =
    Array.from(
      selectedIndexes,
    )
      .filter(
        (index) =>
          index >= 0 &&
          index < chunks.length,
      )
      .sort(
        (a, b) => a - b,
      );

  let output = "";

  for (const index of selected) {
    const chunk = chunks[index];

    if (!chunk) {
      continue;
    }

    const next = output
      ? `${output}\n\n${chunk.text}`
      : chunk.text;

    if (
      next.length >
      MAX_AI_DOCUMENT_CHARS
    ) {
      const remaining =
        MAX_AI_DOCUMENT_CHARS -
        output.length -
        2;

      if (remaining > 200) {
        output =
          `${output}\n\n${chunk.text.slice(
            0,
            remaining,
          )}`;
      }

      break;
    }

    output = next;
  }

  if (!output.trim()) {
    throw new ValidationError(
      "Document does not contain usable text.",
    );
  }

  return (
    `${output}\n\n` +
    "[Document context sampled and truncated to keep AI requests within provider token limits.]"
  );
}

/**
 * Extract a valid JSON object/array from
 * an AI response.
 *
 * Handles:
 *
 * 1. Plain JSON
 * 2. ```json ... ```
 * 3. <think>...</think> wrappers
 * 4. JSON followed by normal prose
 * 5. Nested objects/arrays
 * 6. Braces inside JSON strings
 */
function extractJsonCandidate(
  text: string,
): string {
  let trimmed = text.trim();

  /*
   * Remove reasoning wrapper when a model
   * returns one despite hidden reasoning.
   */
  trimmed = trimmed
    .replace(
      /^<think>[\s\S]*?<\/think>\s*/i,
      "",
    )
    .trim();

  /*
   * Handle markdown JSON fences.
   */
  const fenced = trimmed.match(
    /^```(?:json)?\s*([\s\S]*?)\s*```$/i,
  );

  if (fenced?.[1]) {
    return fenced[1].trim();
  }

  /*
   * Find the first complete balanced
   * JSON object or array.
   */
  for (
    let start = 0;
    start < trimmed.length;
    start += 1
  ) {
    const opener =
      trimmed[start];

    if (
      opener !== "{" &&
      opener !== "["
    ) {
      continue;
    }

    const stack: string[] = [];

    let inString = false;

    let escaped = false;

    for (
      let index = start;
      index < trimmed.length;
      index += 1
    ) {
      const char =
        trimmed[index];

      /*
       * Inside JSON string.
       */
      if (inString) {
        if (escaped) {
          escaped = false;
        } else if (
          char === "\\"
        ) {
          escaped = true;
        } else if (
          char === '"'
        ) {
          inString = false;
        }

        continue;
      }

      /*
       * Start JSON string.
       */
      if (char === '"') {
        inString = true;
        continue;
      }

      /*
       * Opening object/array.
       */
      if (
        char === "{" ||
        char === "["
      ) {
        stack.push(char);
        continue;
      }

      /*
       * Closing object/array.
       */
      if (
        char === "}" ||
        char === "]"
      ) {
        const expected =
          char === "}"
            ? "{"
            : "[";

        /*
         * Invalid nesting.
         */
        if (
          stack.at(-1) !==
          expected
        ) {
          break;
        }

        stack.pop();

        /*
         * Complete JSON found.
         */
        if (!stack.length) {
          return trimmed.slice(
            start,
            index + 1,
          );
        }
      }
    }
  }

  return trimmed;
}

export function parseAiJson<T>(
  text: string,
  schema: z.ZodType<T>,
  label: string,
): T {
  let parsed: unknown;

  try {
    parsed = JSON.parse(
      extractJsonCandidate(text),
    );
  } catch {
    throw new ValidationError(
      `${label} returned invalid JSON. Please retry.`,
    );
  }

  const result =
    schema.safeParse(parsed);

  if (!result.success) {
    throw new ValidationError(
      `${label} returned an invalid structure. Please retry.`,
    );
  }

  return result.data;
}

const GENERATION_LOCK_TTL_MS =
  15 * 60_000;

export async function withGenerationLock<T>(
  key: string,
  operation: () => Promise<T>,
): Promise<T> {
  const leaseId = randomUUID();

  const now = new Date();

  const expiresAt = new Date(
    Date.now() +
      GENERATION_LOCK_TTL_MS,
  );

  try {
    const lock =
      await AiGenerationLockModel.findOneAndUpdate(
        {
          key,

          $or: [
            {
              expiresAt: {
                $lte: now,
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
      !lock ||
      lock.leaseId !== leaseId
    ) {
      throw new AppError(
        "This study artifact is already being generated. Please wait and try again.",
        409,
      );
    }
  } catch (error) {
    if (
      error instanceof AppError
    ) {
      throw error;
    }

    if (
      error instanceof Error &&
      "code" in error &&
      (error as {
        code?: number;
      }).code === 11000
    ) {
      throw new AppError(
        "This study artifact is already being generated. Please wait and try again.",
        409,
      );
    }

    throw error;
  }

  try {
    return await operation();
  } finally {
    await AiGenerationLockModel
      .deleteOne({
        key,
        leaseId,
      })
      .catch(() => undefined);
  }
}

export function artifactModel(
  result: GenerateResult,
): string {
  return `${result.provider}:${result.model}`;
}