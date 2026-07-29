import mongoose, { Schema } from "mongoose";

const documentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    status: {
      type: String,

      default: "uploading",
    },

    metadata: {
      fileName: String,

      originalName: String,

      mimeType: String,

      size: Number,

      pages: {
        type: Number,
        default: 0,
      },
    },

    ai: {
      summaryGenerated: {
        type: Boolean,
        default: false,
      },

      embeddingsGenerated: {
        type: Boolean,
        default: false,
      },

      flashcardsGenerated: {
        type: Boolean,
        default: false,
      },

      quizGenerated: {
        type: Boolean,
        default: false,
      },

      notesGenerated: {
        type: Boolean,
        default: false,
      },
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Document",
  documentSchema
);