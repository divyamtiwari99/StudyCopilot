import { Types } from "mongoose";

import { storageManager } from "../../../core/storage/storage.manager.js";
import { queueService } from "../../../core/queue/queue.service.js";
import { ContentModel } from "../../content/models/content.model.js";
import { ChatMessageModel } from "../models/chat-message.model.js";
import { ChatSessionModel } from "../models/chat-session.model.js";
import { aiConfig } from "../../ai/config/ai.config.js";
import { NotFoundError } from "../../../core/errors/not-found.error.js";
import { ValidationError } from "../../../core/errors/validation.error.js";

export type MessageRole = "user" | "assistant" | "system";

interface CreateSessionInput {
  userId: string;
  contentId?: string;
  documentIds?: string[];
  title?: string;
  scope?: "tutor" | "document";
}

interface CreateMessageInput {
  userId: string;
  sessionId: string;
  role: MessageRole;
  content: string;
  sources?: Array<{ chunkId?: string; title?: string; order?: number; contentId?: string }>;
  attachments?: Array<{
    type: "image" | "document";
    name: string;
    mimeType: string;
    storageKey?: string;
    contentId?: string;
    status?: "uploading" | "processing" | "ready" | "failed";
  }>;
  metadata?: { model?: string; duration?: number; promptTokens?: number; completionTokens?: number; totalTokens?: number };
  clientRequestId?: string;
  status?: "pending" | "completed" | "failed";
  parentMessageId?: string;
}

function toObjectIds(values: string[]): Types.ObjectId[] {
  if (values.some((value) => !Types.ObjectId.isValid(value))) throw new ValidationError("One or more document IDs are invalid.");
  return values.map((value) => new Types.ObjectId(value));
}

export class SessionService {
  async create({ userId, contentId, documentIds = [], title, scope = contentId ? "document" : "tutor" }: CreateSessionInput) {
    if (scope === "document" && !contentId) throw new ValidationError("A document chat requires a primary document.");
    if (scope === "tutor" && contentId) throw new ValidationError("Tutor sessions cannot use contentId as their primary document.");

    const requestedIds = Array.from(new Set([contentId, ...documentIds].filter((value): value is string => Boolean(value))));
    if (requestedIds.length > 50) throw new ValidationError("A chat can reference at most 50 documents.");
    const validIds = toObjectIds(requestedIds);

    if (validIds.length) {
      const count = await ContentModel.countDocuments({ _id: { $in: validIds }, userId });
      if (count !== validIds.length) throw new NotFoundError("One or more selected documents are not available.");
    }

    const createdSession = await ChatSessionModel.create({
      userId: new Types.ObjectId(userId),
      contentId: scope === "document" && contentId ? new Types.ObjectId(contentId) : null,
      documentIds: validIds,
      scope,
      title: title?.trim().slice(0, 160) || "New Chat",
    });

    return ChatSessionModel.findOne({ _id: createdSession._id, userId: new Types.ObjectId(userId), archived: false }).lean();
  }

  async getSessions(userId: string, contentId?: string, scope: "tutor" | "document" = contentId ? "document" : "tutor") {
    const userObjectId = new Types.ObjectId(userId);
    if (contentId && !Types.ObjectId.isValid(contentId)) throw new ValidationError("Document ID is invalid.");
    const query = scope === "document" && contentId
      ? {
          userId: userObjectId,
          archived: false,
          $or: [
            { scope: "document", contentId: new Types.ObjectId(contentId) },
            { scope: { $exists: false }, contentId: new Types.ObjectId(contentId) },
          ],
        }
      : {
          userId: userObjectId,
          archived: false,
          $or: [{ scope: "tutor" }, { scope: { $exists: false }, contentId: null }],
        };

    return ChatSessionModel.find(query).sort({ updatedAt: -1 }).limit(aiConfig.maxChatSessions).lean();
  }

  async getSession(userId: string, sessionId: string) {
    if (!Types.ObjectId.isValid(sessionId)) return null;
    return ChatSessionModel.findOne({ _id: new Types.ObjectId(sessionId), userId: new Types.ObjectId(userId), archived: false }).lean();
  }

  async getMessagesPage(userId: string, sessionId: string, options: { limit?: number; before?: string } = {}) {
    const session = await this.getSession(userId, sessionId);
    if (!session) return null;

    const limit = Math.min(Math.max(options.limit ?? aiConfig.maxChatHistoryMessages, 20), aiConfig.maxChatHistoryMessages);
    const query: Record<string, unknown> = { sessionId: new Types.ObjectId(sessionId) };
    if (options.before) {
      const before = new Date(options.before);
      if (Number.isNaN(before.getTime())) throw new ValidationError("Invalid message cursor.");
      query.createdAt = { $lt: before };
    }

    const messages = await ChatMessageModel.find(query).sort({ createdAt: -1 }).limit(limit + 1).lean();
    const hasMore = messages.length > limit;
    const page = messages.slice(0, limit).reverse();

    const contentIds: string[] = Array.from(new Set(page.flatMap((message) =>
      (message.attachments ?? []).map((attachment) => attachment.contentId?.toString()).filter((id): id is string => Boolean(id)),
    ))).filter((id): id is string => Types.ObjectId.isValid(id));
    const documents = contentIds.length
      ? await ContentModel.find({ _id: { $in: toObjectIds(contentIds) }, userId }).lean()
      : [];
    const documentMap = new Map(documents.map((document) => [document._id.toString(), document]));

    const hydratedMessages = await Promise.all(page.map(async (message) => ({
      ...message,
      id: message._id.toString(),
      createdAt: message.createdAt,
      attachments: await Promise.all((message.attachments ?? []).map(async (attachment) => {
        if (attachment.contentId) {
          const contentId = attachment.contentId.toString();
          const document = documentMap.get(contentId);
          if (!document) return { type: attachment.type, name: attachment.name, mimeType: attachment.mimeType, contentId, status: "failed" as const };
          return {
            type: attachment.type,
            name: attachment.name,
            mimeType: attachment.mimeType,
            contentId,
            status: document.status === "completed" ? "ready" as const : document.status === "failed" ? "failed" as const : "processing" as const,
            url: document.storage?.key ? await storageManager.getSignedUrl(document.storage.key, 900).catch(() => undefined) : undefined,
          };
        }
        if (!attachment.storageKey) return { type: attachment.type, name: attachment.name, mimeType: attachment.mimeType };
        return {
          type: attachment.type,
          name: attachment.name,
          mimeType: attachment.mimeType,
          url: await storageManager.getSignedUrl(attachment.storageKey, 900).catch(() => undefined),
        };
      })),
    })));

    const nextCursor = hydratedMessages[0]?.createdAt instanceof Date
      ? hydratedMessages[0].createdAt.toISOString()
      : undefined;
    return { messages: hydratedMessages, hasMore, nextCursor };
  }

  async getMessages(userId: string, sessionId: string, options: { limit?: number; before?: string } = {}) {
    const page = await this.getMessagesPage(userId, sessionId, options);
    return page?.messages ?? null;
  }

  async createMessage({ userId, sessionId, role, content, sources = [], attachments = [], metadata = {}, clientRequestId, status, parentMessageId }: CreateMessageInput) {
    const session = await this.getSession(userId, sessionId);
    if (!session) throw new NotFoundError("Chat session not found.");
    if (!content.trim()) throw new ValidationError("Message content cannot be empty.");

    const message = await ChatMessageModel.create({
      sessionId: new Types.ObjectId(sessionId),
      role,
      content,
      attachments,
      sources: sources.map((source) => ({
        chunkId: source.chunkId && Types.ObjectId.isValid(source.chunkId) ? new Types.ObjectId(source.chunkId) : undefined,
        title: source.title ?? "",
        order: source.order ?? 0,
        contentId: source.contentId && Types.ObjectId.isValid(source.contentId) ? new Types.ObjectId(source.contentId) : undefined,
      })),
      metadata,
      clientRequestId: clientRequestId ?? null,
      status: status ?? "completed",
      parentMessageId: parentMessageId && Types.ObjectId.isValid(parentMessageId) ? new Types.ObjectId(parentMessageId) : null,
    });

    await ChatSessionModel.updateOne(
      { _id: new Types.ObjectId(sessionId), userId: new Types.ObjectId(userId), archived: false },
      { $set: { lastMessage: content.slice(0, 240) }, $currentDate: { updatedAt: true } },
    );
    return message;
  }

  async findMessageByRequestId(userId: string, sessionId: string, clientRequestId: string) {
    if (!Types.ObjectId.isValid(sessionId)) return null;
    const session = await this.getSession(userId, sessionId);
    if (!session) return null;
    return ChatMessageModel.findOne({
      sessionId: new Types.ObjectId(sessionId),
      clientRequestId,
      role: "user",
    }).lean();
  }

  async updateMessageStatus(
    userId: string,
    sessionId: string,
    messageId: string,
    status: "pending" | "completed" | "failed",
    details: { errorCode?: string; errorMessage?: string; retryCount?: number } = {},
  ) {
    if (!Types.ObjectId.isValid(sessionId) || !Types.ObjectId.isValid(messageId)) throw new ValidationError("Message ID is invalid.");
    return ChatMessageModel.findOneAndUpdate(
      { _id: new Types.ObjectId(messageId), sessionId: new Types.ObjectId(sessionId), role: "user" },
      {
        $set: {
          status,
          errorCode: details.errorCode ?? "",
          errorMessage: details.errorMessage ?? "",
          ...(details.retryCount !== undefined ? { retryCount: details.retryCount } : {}),
        },
      },
      { new: true },
    ).lean();
  }


  async claimMessageForRetry(sessionId: string, messageId: string) {
    if (!Types.ObjectId.isValid(sessionId) || !Types.ObjectId.isValid(messageId)) {
      throw new ValidationError("Message ID is invalid.");
    }

    return ChatMessageModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(messageId),
        sessionId: new Types.ObjectId(sessionId),
        role: "user",
        status: "failed",
      },
      {
        $set: { status: "pending", errorCode: "", errorMessage: "" },
        $inc: { retryCount: 1 },
      },
      { new: true },
    ).lean();
  }

  async updateContext(userId: string, sessionId: string, documentIds: string[]) {
    if (!Types.ObjectId.isValid(sessionId)) throw new ValidationError("Session ID is invalid.");
    const uniqueIds = Array.from(new Set(documentIds));
    if (uniqueIds.length > 50) throw new ValidationError("A chat can reference at most 50 documents.");
    const objectIds = toObjectIds(uniqueIds);

    const count = objectIds.length ? await ContentModel.countDocuments({ _id: { $in: objectIds }, userId }) : 0;
    if (count !== uniqueIds.length) throw new NotFoundError("One or more selected documents are not available.");

    const current = await ChatSessionModel.findOne({ _id: new Types.ObjectId(sessionId), userId: new Types.ObjectId(userId), archived: false }).lean();
    if (!current) return null;

    return ChatSessionModel.findOneAndUpdate(
      { _id: new Types.ObjectId(sessionId), userId: new Types.ObjectId(userId), archived: false },
      { $set: { contentId: current.scope === "document" ? current.contentId : null, documentIds: objectIds, scope: current.scope ?? "tutor" } },
      { new: true },
    ).lean();
  }

  async updateSummary(userId: string, sessionId: string, summary: string) {
    return ChatSessionModel.findOneAndUpdate(
      { _id: new Types.ObjectId(sessionId), userId: new Types.ObjectId(userId), archived: false },
      { $set: { summary: summary.slice(0, 12000) } },
      { new: true },
    ).lean();
  }

  async rename(userId: string, sessionId: string, title: string) {
    if (!Types.ObjectId.isValid(sessionId)) throw new ValidationError("Session ID is invalid.");
    const cleanTitle = title.trim().slice(0, 160);
    if (!cleanTitle) throw new ValidationError("A valid title is required.");
    return ChatSessionModel.findOneAndUpdate(
      { _id: new Types.ObjectId(sessionId), userId: new Types.ObjectId(userId), archived: false },
      { $set: { title: cleanTitle } },
      { new: true },
    ).lean();
  }

  async delete(userId: string, sessionId: string) {
    if (!Types.ObjectId.isValid(sessionId)) throw new ValidationError("Session ID is invalid.");
    const session = await ChatSessionModel.findOne({ _id: new Types.ObjectId(sessionId), userId: new Types.ObjectId(userId) }).lean();
    if (!session) return null;

    const messages = await ChatMessageModel.find({ sessionId: session._id }).select("attachments").lean();
    const storageKeys: string[] = Array.from(new Set(messages.flatMap((message) =>
      (message.attachments ?? []).map((attachment) => attachment.storageKey).filter((key): key is string => Boolean(key)),
    )));

    await ChatMessageModel.deleteMany({ sessionId: session._id });
    await ChatSessionModel.deleteOne({ _id: session._id, userId: new Types.ObjectId(userId) });

    for (const key of storageKeys) {
      try {
        await storageManager.delete(key);
      } catch {
        await queueService.dispatch("storage.cleanup", { key }, { maxAttempts: 5, dedupeKey: `storage.cleanup:${key}` }).catch(() => undefined);
      }
    }

    return { id: session._id.toString() };
  }
}

export const sessionService = new SessionService();
