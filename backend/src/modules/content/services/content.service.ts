import path from "path";

import { ContentModel } from "../models/content.model.js";
import { detectContentKind } from "../storage/content-detector.js";

import { queueService } from "../../../core/queue/queue.service.js";

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
    const kind = detectContentKind(
      file.mimetype,
    );

    const content =
      await ContentModel.create({
        userId,

        title,

        kind,

        status: "processing",

        storage: {
          originalName:
            file.originalname,

          storedName:
            file.filename,

          mimeType:
            file.mimetype,

          extension: path.extname(
            file.originalname,
          ),

          size: file.size,

          path: file.path,
        },

        processing: {
          parser: false,
          normalized: false,
          embeddings: false,
          knowledgeGraph: false,
          summary: false,
          flashcards: false,
          quiz: false,
          notes: false,
        },
      });

    await queueService.dispatch(
      "content.process",
      {
        contentId: content.id,

        filePath: file.path,

        mimeType: file.mimetype,

        stage: "processing",
      },
    );

    return content;
  }

  async getAll(userId: string) {
    const documents =
      await ContentModel.find({
        userId,
      })
        .sort({
          createdAt: -1,
        })
        .lean();

    return documents.map((doc: any) => ({
      id: doc._id.toString(),

      title: doc.title,

      originalName:
        doc.storage.originalName,

      status: doc.status,

      size: doc.storage.size,

      mimeType:
        doc.storage.mimeType,

      createdAt: doc.createdAt,
    }));
  }

  async getById(
    userId: string,
    contentId: string,
  ) {
    const doc =
      await ContentModel.findOne({
        _id: contentId,
        userId,
      });

    if (!doc) {
      return null;
    }

    if (!doc.storage) {
      return null;
    }

    return {
      id: doc.id,

      title: doc.title,

      originalName:
        doc.storage.originalName,

      status: doc.status,

      size: doc.storage.size,

      mimeType:
        doc.storage.mimeType,

      createdAt: doc.createdAt,

      processing: doc.processing,
    };
  }
}

export const contentService =
  new ContentService();