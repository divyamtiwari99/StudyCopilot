import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose";

const ChatSessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    contentId: { type: Schema.Types.ObjectId, ref: "Content", required: false, default: null, index: true },
    documentIds: [{ type: Schema.Types.ObjectId, ref: "Content", index: true }],
    scope: { type: String, enum: ["tutor", "document"], default: "tutor", index: true },
    title: { type: String, required: true, trim: true, maxlength: 160 },
    lastMessage: { type: String, default: "", maxlength: 240 },
    summary: { type: String, default: "" },
    archived: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

ChatSessionSchema.index({ userId: 1, archived: 1, updatedAt: -1 });
ChatSessionSchema.index({ userId: 1, contentId: 1, updatedAt: -1 });
ChatSessionSchema.index({ userId: 1, scope: 1, updatedAt: -1 });

export type ChatSession = InferSchemaType<typeof ChatSessionSchema>;
export type ChatSessionDocument = HydratedDocument<ChatSession>;
export const ChatSessionModel = model<ChatSession>("ChatSession", ChatSessionSchema);
