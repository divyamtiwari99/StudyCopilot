import {
  Request,
  Response,
  NextFunction,
} from "express";

import { uploadContentSchema } from "../validation/content.validation.js";
import { contentService } from "../services/content.service.js";

export class ContentController {
  async upload(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded.",
        });
      }

      const payload =
        uploadContentSchema.parse(
          req.body,
        );

      const content =
        await contentService.create({
          userId: req.user.id,
          title: payload.title,
          file: req.file,
        });

      return res.status(201).json({
        success: true,
        data: content,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const documents =
        await contentService.getAll(
          req.user.id,
        );

      return res.json({
        success: true,
        data: documents,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const contentId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const document =
        await contentService.getById(
          req.user.id,
          contentId,
        );
      if (!document) {
        return res.status(404).json({
          success: false,
          message: "Document not found.",
        });
      }

      return res.json({
        success: true,
        data: document,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const contentController =
  new ContentController();