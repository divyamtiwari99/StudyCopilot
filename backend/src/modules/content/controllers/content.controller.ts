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
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded.",
        });
      }

      const payload = uploadContentSchema.parse(req.body);

      const content = await contentService.create({
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