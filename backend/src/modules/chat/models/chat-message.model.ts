import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose";

const AttachmentSchema = new Schema({
  type: { type: String, enum: ["image", "document"], required: true },
  name: { type: String, required: true, maxlength: 240 },
  mimeType: { type: String, required: true, maxlength: 120 },
  storageKey: { type: String, default: "", maxlength: 500 },
  contentId: { type: Schema.Types.ObjectId, ref: "Content", default: null },
  status: { type: String, enum: ["uploading", "processing", "ready", "failed"], default: null },
}, { _id: false });

const ChatMessageSchema = new Schema({
  sessionId: { type: Schema.Types.ObjectId, ref: "ChatSession", required: true, index: true },
  role: { type: String, enum: ["user", "assistant", "system"], required: true },
  content: { type: String, required: true, maxlength: 120000 },
  clientRequestId: { type: String, default: null, maxlength: 100 },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "completed", index: true },
  errorCode: { type: String, default: "", maxlength: 120 },
  errorMessage: { type: String, default: "", maxlength: 1000 },
  retryCount: { type: Number, default: 0, min: 0, max: 100 },
  parentMessageId: { type: Schema.Types.ObjectId, ref: "ChatMessage", default: null, index: true },
  attachments: { type: [AttachmentSchema], default: [] },
  metadata: {
    promptTokens: { type: Number, default: 0 },
    completionTokens: { type: Number, default: 0 },
    totalTokens: { type: Number, default: 0 },
    model: { type: String, default: "" },
    duration: { type: Number, default: 0 },
  },
  sources: [{
    chunkId: { type: Schema.Types.ObjectId, ref: "Chunk" },
    title: { type: String, default: "" },
    order: { type: Number, default: 0 },
    contentId: { type: Schema.Types.ObjectId, ref: "Content" },
  }],
}, { timestamps: true });

ChatMessageSchema.index({ sessionId: 1, createdAt: 1 });
ChatMessageSchema.index(
  { sessionId: 1, clientRequestId: 1 },
  {
    unique: true,
    partialFilterExpression: { role: "user", clientRequestId: { $type: "string" } },
  },
);

export type ChatMessage = InferSchemaType<typeof ChatMessageSchema>;
export type ChatMessageDocument = HydratedDocument<ChatMessage>;
export const ChatMessageModel = model<ChatMessage>("ChatMessage", ChatMessageSchema);
