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

        // Future AI Pipeline
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
    return ContentModel.find({
      userId,
    })
      .sort({
        createdAt: -1,
      })
      .lean();
  }
}

export const contentService =
  new ContentService();