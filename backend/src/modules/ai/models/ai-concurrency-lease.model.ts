import mongoose, { Schema, type InferSchemaType } from "mongoose";

const AiConcurrencyLeaseSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    slot: { type: Number, required: true, min: 0 },
    leaseId: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
);

AiConcurrencyLeaseSchema.index({ userId: 1, slot: 1 }, { unique: true });
AiConcurrencyLeaseSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 60 });

export type AiConcurrencyLease = InferSchemaType<typeof AiConcurrencyLeaseSchema>;
export const AiConcurrencyLeaseModel =
  mongoose.models.AiConcurrencyLease as mongoose.Model<AiConcurrencyLease> | undefined ??
  mongoose.model<AiConcurrencyLease>("AiConcurrencyLease", AiConcurrencyLeaseSchema);
