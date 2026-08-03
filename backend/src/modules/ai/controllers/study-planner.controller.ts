import { Request, Response } from "express";

import { studyPlannerService } from "../services/study-planner.service.js";

class StudyPlannerController {
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
        await studyPlannerService.generate({
          contentId,
          userId: req.user.id,
        });

      return res.status(200).json({
        success: true,
        data: artifact,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to generate study planner.",
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
        await studyPlannerService.regenerate({
          contentId,
          userId: req.user.id,
        });

      return res.status(200).json({
        success: true,
        data: artifact,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to regenerate study planner.",
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

      const planner =
        await studyPlannerService.get(
          contentId,
        );

      // Planner abhi generate nahi hua
      if (!planner) {
        return res.status(200).json({
          success: true,
          data: null,
        });
      }

      return res.status(200).json({
        success: true,
        data: planner,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch study planner.",
      });
    }
  }
}

export const studyPlannerController =
  new StudyPlannerController();