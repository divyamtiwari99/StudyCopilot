import { Schema, model } from "mongoose";

const ChunkSchema = new Schema(
  {
    contentId: {
      type: Schema.Types.ObjectId,
      ref: "Content",
      required: true,
      index: true,
    },

    order: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      default: "",
    },

    text: {
      type: String,
      required: true,
    },

    tokens: {
      type: Number,
      required: true,
    },

    embeddingStatus: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const ChunkModel = model(
  "Chunk",
  ChunkSchema
);