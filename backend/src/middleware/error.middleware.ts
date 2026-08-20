import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import multer from "multer";
import { ZodError } from "zod";
import { AppError } from "../core/errors/app.error.js";
import { RateLimitError } from "../core/errors/rate-limit.error.js";
import { AIProviderError } from "../modules/ai/providers/provider.error.js";

export function errorMiddleware(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: error.code === "LIMIT_FILE_SIZE" ? "File is too large." : error.message });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({ success: false, message: error.issues[0]?.message ?? "Invalid request." });
  }

  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({ success: false, message: "Invalid request identifier." });
  }

  if (error instanceof AIProviderError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      code: error.code,
      provider: error.provider,
      attemptedProviders: error.attemptedProviders,
      ...(error.retryAfterMs !== undefined ? { retryAfterMs: error.retryAfterMs, retryAfterSeconds: Math.max(1, Math.ceil(error.retryAfterMs / 1000)) } : {}),
    });
  }

  if (error instanceof RateLimitError) {
    return res.status(error.statusCode).json({
      success: false,
      code: error.code,
      message: error.message,
      ...(error.retryAfterMs !== undefined
        ? { retryAfterMs: error.retryAfterMs, retryAfterSeconds: Math.max(1, Math.ceil(error.retryAfterMs / 1000)) }
        : {}),
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ success: false, message: error.message });
  }

  if (error instanceof Error && /^(Unsupported (attachment|file|image) type|No parser found|No file uploaded|The uploaded file is not a valid|Unsupported mime type)/i.test(error.message)) {
    return res.status(400).json({ success: false, message: error.message });
  }

  if (typeof error === "object" && error !== null && "code" in error && error.code === 11000) {
    return res.status(409).json({ success: false, message: "A record with the same unique value already exists." });
  }

  console.error(error);
  return res.status(500).json({ success: false, message: "Something went wrong while processing your request." });
}
