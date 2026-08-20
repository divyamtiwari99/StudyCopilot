import { Request, Response } from "express";
import { AppError } from "../../../core/errors/app.error.js";

import { roadmapService } from "../services/roadmap.service.js";
import { AIProviderError } from "../providers/provider.error.js";

class RoadmapController {
  async generate(
    req: Request,
    res: Response,
  ) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const { contentId } = req.body;

      if (
        typeof contentId !== "string" ||
        !contentId.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "contentId is required.",
        });
      }

      const artifact =
        await roadmapService.generate({
          contentId,
          userId: req.user.id,
        });

      return res.status(200).json({
        success: true,
        data: artifact,
      });
    } catch (error) {
      if (error instanceof AIProviderError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
          code: error.code,
          provider: error.provider,
          attemptedProviders: error.attemptedProviders,
        });
      }
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ success: false, message: error.message });
      }

      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to generate roadmap.",
      });
    }
  }

  async regenerate(
    req: Request,
    res: Response,
  ) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const { contentId } = req.body;

      if (
        typeof contentId !== "string" ||
        !contentId.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "contentId is required.",
        });
      }

      const artifact =
        await roadmapService.regenerate({
          contentId,
          userId: req.user.id,
        });

      return res.status(200).json({
        success: true,
        data: artifact,
      });
    } catch (error) {
      if (error instanceof AIProviderError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
          code: error.code,
          provider: error.provider,
          attemptedProviders: error.attemptedProviders,
        });
      }
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ success: false, message: error.message });
      }

      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to regenerate roadmap.",
      });
    }
  }

  async get(
    req: Request,
    res: Response,
  ) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const rawContentId =
        req.params.contentId;

      const contentId =
        Array.isArray(rawContentId)
          ? rawContentId[0]
          : rawContentId;

      if (!contentId) {
        return res.status(400).json({
          success: false,
          message: "contentId is required.",
        });
      }

      const roadmap =
        await roadmapService.get(
          contentId,
          req.user.id,
        );

      if (!roadmap) {
        return res.status(404).json({
          success: false,
          message:
            "Roadmap not found.",
        });
      }

      return res.json({
        success: true,
        data: roadmap,
      });
    } catch (error) {
      if (error instanceof AIProviderError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
          code: error.code,
          provider: error.provider,
          attemptedProviders: error.attemptedProviders,
        });
      }
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ success: false, message: error.message });
      }

      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch roadmap.",
      });
    }
  }
}

export const roadmapController =
  new RoadmapController();
