import { Schema, Types, model } from "mongoose";

export type AIArtifactType =
  | "notes"
  | "summary"
  | "flashcards"
  | "quiz"
  | "knowledgeGraph";

const AIArtifactSchema = new Schema(
  {
    contentId: {
      type: Types.ObjectId,
      ref: "Content",
      required: true,
      index: true,
    },

    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      required: true,
      enum: [
        "notes",
        "summary",
        "flashcards",
        "quiz",
        "knowledgeGraph",
      ],
      index: true,
    },

    version: {
      type: Number,
      default: 1,
    },

    title: {
      type: String,
      default: "",
      trim: true,
    },

    markdown: {
      type: String,
      default: "",
    },

    json: {
      type: Schema.Types.Mixed,
      default: null,
    },

    metadata: {
      model: {
        type: String,
        default: "",
      },

      promptVersion: {
        type: String,
        default: "v1",
      },

      tokens: {
        type: Number,
        default: 0,
      },

      generationTime: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

AIArtifactSchema.index({
  contentId: 1,
  type: 1,
});

AIArtifactSchema.index({
  userId: 1,
  type: 1,
});

export const AIArtifactModel = model(
  "AIArtifact",
  AIArtifactSchema
);