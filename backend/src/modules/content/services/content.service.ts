import path from "node:path";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import { Types } from "mongoose";

import { env } from "../../../config/env.js";
import { ContentModel } from "../models/content.model.js";
import { ChunkModel } from "../models/chunk.model.js";
import { EmbeddingModel } from "../models/embedding.model.js";
import { ChatSessionModel } from "../../chat/models/chat-session.model.js";
import { detectContentKind } from "../storage/content-detector.js";
import { parserFactory } from "../parser/parser.factory.js";
import { aiArtifactService } from "../../ai/services/ai-artifact.service.js";
import { queueService } from "../../../core/queue/queue.service.js";
import { storageManager } from "../../../core/storage/storage.manager.js";
import { tempFileService } from "../../../core/storage/temp-file.service.js";
import { validateFileSignature } from "../../../core/storage/file-signature.js";
import { ValidationError } from "../../../core/errors/validation.error.js";
import { NotFoundError } from "../../../core/errors/not-found.error.js";

export interface CreateContentInput {
  userId: string;
  title: string;
  file: Express.Multer.File;
  deferProcessing?: boolean;
}

export interface ContentResponse {
  id: string;
  title: string;
  originalName: string;
  status: "uploading" | "processing" | "ready" | "failed";
  size: number;
  pages?: number;
  mimeType: string;
  createdAt: Date | string;
  processing?: Record<string, boolean>;
}

interface ContentLike {
  _id?: unknown;
  id?: string;
  title: string;
  status: string;
  // Mongoose can infer optional numeric fields as number | null | undefined.
  // Accept that storage-layer shape here and normalize it at the API boundary.
  pages?: number | null;
  createdAt: Date | string;
  storage: { originalName: string; size: number; mimeType: string };
  processing?: Record<string, boolean>;
}

function toContentResponse(doc: ContentLike): ContentResponse {
  const status: ContentResponse["status"] = doc.status === "completed" ? "ready" : doc.status === "failed" ? "failed" : "processing";
  return {
    id: doc._id != null ? String(doc._id) : doc.id ?? "",
    title: doc.title,
    originalName: doc.storage.originalName,
    status,
    size: doc.storage.size,
    pages: typeof doc.pages === "number" ? doc.pages : undefined,
    mimeType: doc.storage.mimeType,
    createdAt: doc.createdAt,
    processing: doc.processing,
  };
}

function assertContentId(contentId: string) {
  if (!Types.ObjectId.isValid(contentId)) throw new ValidationError("Invalid document ID.");
}

async function enqueueStorageCleanup(key: string) {
  await queueService.dispatch("storage.cleanup", { key }, { maxAttempts: 5, dedupeKey: `storage.cleanup:${key}` }).catch(() => undefined);
}

export class ContentService {
  async create({ userId, title, file, deferProcessing = false }: CreateContentInput) {
    const kind = detectContentKind(file.mimetype);
    parserFactory.getParser(file.mimetype);
    const extension = path.extname(file.originalname).toLowerCase();
    const safeOriginalName = file.originalname.replace(/[^a-zA-Z0-9._() -]/g, "_").replace(/\s+/g, " ").trim().slice(0, 180) || "document";
    const tempPath = file.path;
    let uploaded: Awaited<ReturnType<typeof storageManager.upload>> | null = null;
    let contentId: string | null = null;

    try {
      if (!tempPath) throw new ValidationError("Uploaded file storage path is unavailable.");
      await validateFileSignature(tempPath, file.mimetype);
      const fileBuffer = file.buffer ?? await fs.readFile(tempPath);

      const existingBytesResult = await ContentModel.aggregate([
        { $match: { userId: new Types.ObjectId(userId) } },
        { $group: { _id: null, totalSize: { $sum: "$storage.size" } } },
      ]);
      const existingBytes = Number(existingBytesResult[0]?.totalSize ?? 0);
      const limitBytes = env.STORAGE_LIMIT_GB * 1024 * 1024 * 1024;
      if (existingBytes + fileBuffer.length > limitBytes) {
        throw new ValidationError("Storage limit reached. Delete an existing document or upgrade your plan.");
      }

      uploaded = await storageManager.upload({
        file: fileBuffer,
        fileName: safeOriginalName,
        mimeType: file.mimetype,
        path: `${userId}/${crypto.randomUUID()}-${safeOriginalName}`,
      });

      const content = await ContentModel.create({
        userId,
        title: title.trim() || safeOriginalName,
        kind,
        status: "processing",
        storage: {
          originalName: safeOriginalName,
          storedName: uploaded.key,
          mimeType: uploaded.mimeType,
          extension,
          size: uploaded.size,
          path: uploaded.key,
          provider: uploaded.provider,
          bucket: uploaded.bucket,
          key: uploaded.key,
          url: uploaded.url,
        },
        processing: {
          parser: false, normalized: false, embeddings: false, knowledgeGraph: false,
          roadmap: false, summary: false, flashcards: false, quiz: false, notes: false, studyPlanner: false,
        },
      });

      const createdContentId = content._id.toString();
      contentId = createdContentId;
      const storedFile = uploaded;
      if (!storedFile) throw new Error("Storage upload did not return a file reference.");
      if (!deferProcessing) await this.startProcessing(userId, createdContentId, storedFile.key, storedFile.mimeType);
      return toContentResponse(content.toObject());
    } catch (error) {
      if (contentId) await this.rollbackCreatedContent(userId, contentId).catch(() => undefined);
      else if (uploaded?.key) {
        try { await storageManager.delete(uploaded.key); }
        catch { await enqueueStorageCleanup(uploaded.key); }
      }
      throw error;
    } finally {
      if (tempPath) await tempFileService.delete(tempPath).catch(() => undefined);
    }
  }

  async startProcessing(userId: string, contentId: string, storageKey: string, mimeType: string) {
    assertContentId(contentId);
    const content = await ContentModel.findOne({ _id: contentId, userId }).lean();
    if (!content) throw new NotFoundError("Document not found.");
    if (content.storage.key !== storageKey) throw new ValidationError("Document storage reference is invalid.");
    await queueService.dispatch("content.process", { userId, contentId, storageKey, mimeType, stage: "uploaded" }, { maxAttempts: 3, dedupeKey: `content.process:${contentId}` });
  }

  async rollbackCreatedContent(userId: string, contentId: string) {
    assertContentId(contentId);
    const document = await ContentModel.findOne({ _id: contentId, userId });
    if (!document) return;
    await queueService.cancelByDedupeKey(`content.process:${contentId}`).catch(() => undefined);
    if (document.storage.key) {
      try { await storageManager.delete(document.storage.key); }
      catch { await enqueueStorageCleanup(document.storage.key); }
    }
    await ChunkModel.deleteMany({ contentId });
    await EmbeddingModel.deleteMany({ contentId });
    await aiArtifactService.deleteAllByContent(userId, contentId);
    await ContentModel.deleteOne({ _id: contentId, userId });
  }

  async getAll(userId: string): Promise<ContentResponse[]> {
    const documents = await ContentModel.find({ userId }).sort({ createdAt: -1 }).limit(500).lean();
    return documents.map((document) => toContentResponse(document));
  }

  async getById(userId: string, contentId: string) {
    assertContentId(contentId);
    const doc = await ContentModel.findOne({ _id: contentId, userId }).lean();
    return doc ? toContentResponse(doc) : null;
  }

  async rename(userId: string, contentId: string, title: string) {
    assertContentId(contentId);
    const cleanTitle = title.trim();
    if (!cleanTitle) throw new ValidationError("Document title is required.");
    const document = await ContentModel.findOneAndUpdate(
      { _id: contentId, userId },
      { $set: { title: cleanTitle.slice(0, 160) } },
      { new: true, runValidators: true },
    ).lean();
    if (!document) throw new NotFoundError("Document not found.");
    return toContentResponse(document);
  }

  async delete(userId: string, contentId: string) {
    assertContentId(contentId);
    const document = await ContentModel.findOne({ _id: contentId, userId });
    if (!document) throw new NotFoundError("Document not found.");

    await queueService.cancelByDedupeKey(`content.process:${contentId}`).catch(() => undefined);
    if (document.storage.key) {
      try { await storageManager.delete(document.storage.key); }
      catch { await enqueueStorageCleanup(document.storage.key); }
    }

    await ChatSessionModel.updateMany({ userId, contentId }, { $set: { contentId: null, scope: "tutor" } });
    await ChatSessionModel.updateMany({ userId, documentIds: contentId }, { $pull: { documentIds: contentId } });
    await ChunkModel.deleteMany({ contentId });
    await EmbeddingModel.deleteMany({ contentId });
    await aiArtifactService.deleteAllByContent(userId, contentId);
    await ContentModel.deleteOne({ _id: contentId, userId });
    return { success: true };
  }
}

export const contentService = new ContentService();
