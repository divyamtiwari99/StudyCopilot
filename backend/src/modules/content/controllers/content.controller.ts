import { Request, Response, NextFunction } from "express";

import { uploadContentSchema } from "../validation/content.validation.js";
import { contentService } from "../services/content.service.js";

export class ContentController {
  async upload(
    req: Request,
    res: Response,
    next: NextFunction
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

      const payload = uploadContentSchema.parse(req.body);

      const content = await contentService.create({
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
}

export const contentController =
  new ContentController();