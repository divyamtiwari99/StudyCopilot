import { Schema, model, Types } from "mongoose";

const ContentSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    kind: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "uploading",
    },

    storage: {
      originalName: String,
      storedName: String,
      mimeType: String,
      extension: String,
      size: Number,
      path: String,
    },

    processing: {
      parser: {
        type: Boolean,
        default: false,
      },

      normalized: {
        type: Boolean,
        default: false,
      },

      embeddings: {
        type: Boolean,
        default: false,
      },

      knowledgeGraph: {
        type: Boolean,
        default: false,
      },

      summary: {
        type: Boolean,
        default: false,
      },

      flashcards: {
        type: Boolean,
        default: false,
      },

      quiz: {
        type: Boolean,
        default: false,
      },

      notes: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const ContentModel = model(
  "Content",
  ContentSchema
);