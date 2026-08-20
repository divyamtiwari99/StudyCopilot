import type { NextFunction, Request, Response } from "express";
import { RateLimitModel } from "../models/rate-limit.model.js";

interface RateLimitOptions {
  windowMs: number;
  max: number;
  name: string;
  key?: (req: Request) => string;
}

function clientIp(req: Request): string {
  return req.ip || req.socket.remoteAddress || "unknown";
}

function isDuplicateKeyError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === 11000;
}

export function rateLimit({ windowMs, max, name, key }: RateLimitOptions) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") return next();

    const identity = key?.(req) || clientIp(req);
    const bucket = Math.floor(Date.now() / windowMs);
    const windowStart = new Date(bucket * windowMs);
    const expiresAt = new Date(windowStart.getTime() + windowMs + 60_000);
    const rateKey = `${name}:${identity}`;

    try {
      let record;
      try {
        record = await RateLimitModel.findOneAndUpdate(
          { key: rateKey, windowStart },
          { $inc: { count: 1 }, $setOnInsert: { expiresAt } },
          { upsert: true, new: true, setDefaultsOnInsert: true },
        ).lean();
      } catch (error) {
        if (!isDuplicateKeyError(error)) throw error;
        record = await RateLimitModel.findOneAndUpdate(
          { key: rateKey, windowStart },
          { $inc: { count: 1 } },
          { new: true },
        ).lean();
      }

      if (!record) {
        return res.status(503).json({
          success: false,
          message: "Rate limiting service is temporarily unavailable.",
        });
      }

      const remaining = Math.max(0, max - record.count);
      const resetAt = windowStart.getTime() + windowMs;
      res.setHeader("X-RateLimit-Limit", String(max));
      res.setHeader("X-RateLimit-Remaining", String(remaining));
      res.setHeader("X-RateLimit-Reset", String(Math.ceil(resetAt / 1000)));

      if (record.count > max) {
        res.setHeader("Retry-After", String(Math.max(1, Math.ceil((resetAt - Date.now()) / 1000))));
        return res.status(429).json({ success: false, code: "app_rate_limit", message: "Too many requests. Please try again later.", retryAfterSeconds: Math.max(1, Math.ceil((resetAt - Date.now()) / 1000)) });
      }

      return next();
    } catch (error) {
      console.error("Rate limiter unavailable:", error);
      return res.status(503).json({
        success: false,
        message: "Rate limiting service is temporarily unavailable.",
      });
    }
  };
}
