import { Schema, Types, model } from "mongoose";

export interface RefreshSessionDocument {
  userId: Types.ObjectId;
  tokenHash: string;
  familyId: string;
  expiresAt: Date;
  revokedAt?: Date | null;
  replacedByHash?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const RefreshSessionSchema = new Schema<RefreshSessionDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    tokenHash: { type: String, required: true, unique: true, index: true },
    familyId: { type: String, required: true, index: true },
    expiresAt: { type: Date, required: true },
    revokedAt: { type: Date, default: null },
    replacedByHash: { type: String, default: null },
  },
  { timestamps: true },
);

RefreshSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RefreshSessionModel = model<RefreshSessionDocument>("RefreshSession", RefreshSessionSchema);
