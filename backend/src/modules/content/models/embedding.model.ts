import { Schema, model } from "mongoose";

const EmbeddingSchema = new Schema(
  {
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

export const EmbeddingModel = model(
  "Embedding",
  EmbeddingSchema
);