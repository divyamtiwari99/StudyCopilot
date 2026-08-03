import {
  Schema,
  model,
  Types,
  InferSchemaType,
} from "mongoose";

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
      originalName: {
        type: String,
        required: true,
      },

      storedName: {
        type: String,
        required: true,
      },

      mimeType: {
        type: String,
        required: true,
      },

      extension: {
        type: String,
        required: true,
      },

      size: {
        type: Number,
        required: true,
      },

      path: {
        type: String,
        required: true,
      },
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

      roadmap: {
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
  },
);

export type ContentDocument =
  InferSchemaType<typeof ContentSchema>;

export const ContentModel = model(
  "Content",
  ContentSchema,
);