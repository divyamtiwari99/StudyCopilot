import {
  Schema,
  model,
  Types,
  InferSchemaType,
} from "mongoose";

const ChatMessageSchema =
  new Schema(
    {
      sessionId: {
        type: Types.ObjectId,
        ref: "ChatSession",
        required: true,
        index: true,
      },

      role: {
        type: String,
        enum: [
          "user",
          "assistant",
          "system",
        ],
        required: true,
      },

      content: {
        type: String,
        required: true,
      },

      metadata: {
        promptTokens: {
          type: Number,
          default: 0,
        },

        completionTokens: {
          type: Number,
          default: 0,
        },

        totalTokens: {
          type: Number,
          default: 0,
        },

        model: {
          type: String,
          default: "",
        },

        duration: {
          type: Number,
          default: 0,
        },
      },

      sources: [
        {
          chunkId: {
            type: Types.ObjectId,
            ref: "Chunk",
          },

          title: {
            type: String,
            default: "",
          },

          order: {
            type: Number,
            default: 0,
          },
        },
      ],
    },
    {
      timestamps: true,
    },
  );

ChatMessageSchema.index({
  sessionId: 1,
  createdAt: 1,
});

export type ChatMessageDocument =
  InferSchemaType<
    typeof ChatMessageSchema
  >;

export const ChatMessageModel =
  model(
    "ChatMessage",
    ChatMessageSchema,
  );