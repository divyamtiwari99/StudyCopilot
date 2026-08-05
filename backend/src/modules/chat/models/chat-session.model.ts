import {
  Schema,
  model,
  Types,
  InferSchemaType,
} from "mongoose";

const ChatSessionSchema =
  new Schema(
    {
      userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      contentId: {
        type: Types.ObjectId,
        ref: "Content",
        required: true,
        index: true,
      },

      title: {
        type: String,
        required: true,
        trim: true,
      },

      lastMessage: {
        type: String,
        default: "",
      },

      archived: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    },
  );

ChatSessionSchema.index({
  userId: 1,
  contentId: 1,
  updatedAt: -1,
});

export type ChatSessionDocument =
  InferSchemaType<
    typeof ChatSessionSchema
  >;

export const ChatSessionModel =
  model(
    "ChatSession",
    ChatSessionSchema,
  );