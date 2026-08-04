import path from "path";

import { ContentModel } from "../models/content.model.js";
import { ChunkModel } from "../models/chunk.model.js";

import { detectContentKind } from "../storage/content-detector.js";

import { aiArtifactService } from "../../ai/services/ai-artifact.service.js";

import { queueService } from "../../../core/queue/queue.service.js";

import {
  storageManager,
} from "../../../core/storage/storage.manager.js";

import {
  tempFileService,
} from "../../../core/storage/temp-file.service.js";

export interface CreateContentInput {
  userId: string;

  title: string;

  file: Express.Multer.File;
}

export class ContentService {

  async create({
    userId,
    title,
    file,
  }: CreateContentInput) {

    const kind =
      detectContentKind(
        file.mimetype,
      );

    const extension =
      path.extname(
        file.originalname,
      );

    // ===========================
    // Upload To Supabase
    // ===========================

      console.log("=== Upload Debug ===");

console.log({
  hasFile: !!file,
  hasBuffer: !!file.buffer,
  bufferLength: file.buffer?.length,
  originalName: file.originalname,
  mimeType: file.mimetype,
});

console.log("====================");






    const uploaded =
      await storageManager.upload({
        file: file.buffer,

        fileName:
          file.originalname,

        mimeType:
          file.mimetype,

        path:
          `${userId}/${Date.now()}-${file.originalname}`,
      });

    // ===========================
    // Temporary File
    // ===========================

    const temp =
      await tempFileService.create(
        file.buffer,
        extension,
      );

    try {

      const content =
        await ContentModel.create({

          userId,

          title,

          kind,

          status:
            "processing",

          storage: {

            originalName:
              file.originalname,

            storedName:
              uploaded.key,

            mimeType:
              uploaded.mimeType,

            extension,

            size:
              uploaded.size,

            path:
              temp.filePath,

            provider:
              uploaded.provider,

            bucket:
              uploaded.bucket,

            key:
              uploaded.key,

            url:
              uploaded.url,

          },

          processing: {

            parser: false,

            normalized: false,

            embeddings: false,

            knowledgeGraph: false,

            roadmap: false,

            summary: false,

            flashcards: false,

            quiz: false,

            notes: false,

            studyPlanner: false,

          },

        });

      await queueService.dispatch(
        "content.process",
        {

          contentId:
            content.id,

          filePath:
            temp.filePath,

          mimeType:
            file.mimetype,

          stage:
            "processing",

        },
      );

      return content;

    } finally {

      await tempFileService.delete(
        temp.filePath,
      );

    }

  }

  async getAll(
    userId: string,
  ) {

    const documents =
      await ContentModel.find({
        userId,
      })
        .sort({
          createdAt: -1,
        })
        .lean();

    return documents.map(
      (doc: any) => ({

        id:
          doc._id.toString(),

        title:
          doc.title,

        originalName:
          doc.storage.originalName,

        status:
          doc.status,

        size:
          doc.storage.size,

        mimeType:
          doc.storage.mimeType,

        createdAt:
          doc.createdAt,

      }),
    );

  }

  async getById(
    userId: string,
    contentId: string,
  ) {

    const doc =
      await ContentModel.findOne({

        _id:
          contentId,

        userId,

      });

    if (!doc) {
      return null;
    }

    return {

      id:
        doc.id,

      title:
        doc.title,

      originalName:
        doc.storage.originalName,

      status:
        doc.status,

      size:
        doc.storage.size,

      mimeType:
        doc.storage.mimeType,

      createdAt:
        doc.createdAt,

      processing:
        doc.processing,

    };

  }

  // ======================
  // Rename Document
  // ======================

  async rename(
    userId: string,
    contentId: string,
    title: string,
  ) {

    const document =
      await ContentModel.findOneAndUpdate(
        {

          _id:
            contentId,

          userId,

        },
        {

          $set: {
            title,
          },

        },
        {

          new: true,

        },
      );

    if (!document) {

      throw new Error(
        "Document not found.",
      );

    }

    return document;

  }

  // ======================
  // Delete Document
  // ======================

  async delete(
    userId: string,
    contentId: string,
  ) {

    const document =
      await ContentModel.findOne({

        _id:
          contentId,

        userId,

      });

    if (!document) {

      throw new Error(
        "Document not found.",
      );

    }

    // ===========================
    // Delete From Storage Provider
    // ===========================

    if (

      document.storage.provider ===
      "supabase" &&

      document.storage.key

    ) {

      await storageManager.delete(

        document.storage.key,

      );

    }

    // ===========================
    // Delete AI Chunks
    // ===========================

    await ChunkModel.deleteMany({

      contentId,

    });

    // ===========================
    // Delete AI Artifacts
    // ===========================

    await aiArtifactService
      .deleteAllByContent(
        contentId,
      );

    // ===========================
    // Delete Content
    // ===========================

    await ContentModel.findByIdAndDelete(

      contentId,

    );

    return {

      success: true,

    };

  }

}

export const contentService =
  new ContentService();