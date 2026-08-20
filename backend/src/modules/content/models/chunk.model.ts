import { Schema, model, InferSchemaType } from "mongoose";

const ChunkSchema = new Schema({
  contentId: { type: Schema.Types.ObjectId, ref: "Content", required: true, index: true },
  order: { type: Number, required: true },
  title: { type: String, default: "" },
  text: { type: String, required: true },
  tokens: { type: Number, required: true },
  embeddingStatus: { type: String, enum: ["pending", "processing", "completed", "failed"], default: "pending" },
}, { timestamps: true });

ChunkSchema.index({ contentId: 1, order: 1 }, { unique: true });

export type ChunkDocument = InferSchemaType<typeof ChunkSchema>;
export const ChunkModel = model<ChunkDocument>("Chunk", ChunkSchema);
