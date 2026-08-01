import { Schema, model } from "mongoose";

const EmbeddingSchema = new Schema(
  {
    contentId: {
      type: Schema.Types.ObjectId,
      ref: "Content",
      required: true,
      index: true,
    },

    chunkId: {
      type: Schema.Types.ObjectId,
      ref: "Chunk",
      required: true,
      unique: true,
      index: true,
    },

    vector: {
      type: [Number],
      required: true,
    },

    dimensions: {
      type: Number,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

EmbeddingSchema.index({
  contentId: 1,
  chunkId: 1,
});

export const EmbeddingModel = model(
  "Embedding",
  EmbeddingSchema
);