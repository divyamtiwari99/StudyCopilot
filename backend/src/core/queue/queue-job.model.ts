import { Schema, model, InferSchemaType } from "mongoose";

const QueueJobSchema = new Schema({
  name: { type: String, required: true, index: true },
  payload: { type: Schema.Types.Mixed, required: true },
  status: { type: String, enum: ["queued", "running", "completed", "failed"], default: "queued", index: true },
  attempts: { type: Number, default: 0 },
  maxAttempts: { type: Number, default: 3 },
  availableAt: { type: Date, default: Date.now, index: true },
  lockedUntil: { type: Date, default: null, index: true },
  lastError: { type: String, default: "" },
  dedupeKey: { type: String, default: null, index: true },
}, { timestamps: true });

QueueJobSchema.index({ status: 1, availableAt: 1, lockedUntil: 1 });
QueueJobSchema.index(
  { name: 1, dedupeKey: 1 },
  { unique: true, partialFilterExpression: { dedupeKey: { $type: "string" }, status: { $in: ["queued", "running"] } } },
);
QueueJobSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 14 });

export type QueueJobDocument = InferSchemaType<typeof QueueJobSchema>;
export const QueueJobModel = model<QueueJobDocument>("QueueJob", QueueJobSchema);
