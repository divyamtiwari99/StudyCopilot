import { Schema, model } from "mongoose";

const RateLimitSchema = new Schema(
  {
    key: { type: String, required: true },
    windowStart: { type: Date, required: true },
    count: { type: Number, required: true, default: 0 },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
);

RateLimitSchema.index({ key: 1, windowStart: 1 }, { unique: true });
RateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RateLimitModel = model("RateLimit", RateLimitSchema);
