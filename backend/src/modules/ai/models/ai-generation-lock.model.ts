import mongoose, { Schema, type InferSchemaType } from "mongoose";

const AiGenerationLockSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    leaseId: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
);

AiGenerationLockSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 60 });

export type AiGenerationLock = InferSchemaType<typeof AiGenerationLockSchema>;
export const AiGenerationLockModel =
  mongoose.models.AiGenerationLock as mongoose.Model<AiGenerationLock> | undefined ??
  mongoose.model<AiGenerationLock>("AiGenerationLock", AiGenerationLockSchema);
