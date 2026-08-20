import { z } from "zod";

const booleanField = z.preprocess((value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.trim().toLowerCase() === "true";
  return value;
}, z.boolean());

export const chatRequestSchema = z.object({
  sessionId: z.string().trim().min(1).max(100).optional(),
  contentId: z.string().trim().min(1).max(100).optional(),
  documentIds: z.array(z.string().trim().min(1).max(100)).max(50).optional(),
  question: z.string().trim().max(100000),
  mode: z.enum(["study", "assistant", "hybrid"]).optional(),
  responseLength: z.enum(["short", "balanced", "detailed"]).optional(),
  citations: booleanField.optional(),
  deepReasoning: booleanField.optional(),
  requestId: z.string().trim().min(8).max(100).regex(/^[A-Za-z0-9_-]+$/).optional(),
}).strict();

export const sessionCreateSchema = z.object({
  contentId: z.string().trim().min(1).max(100).optional(),
  documentIds: z.array(z.string().trim().min(1).max(100)).max(50).default([]),
  title: z.string().trim().max(160).optional(),
  scope: z.enum(["tutor", "document"]).optional(),
}).strict();

export const sessionContextSchema = z.object({
  documentIds: z.array(z.string().trim().min(1).max(100)).max(50),
}).strict();

export const sessionRenameSchema = z.object({
  title: z.string().trim().min(1).max(160),
}).strict();
