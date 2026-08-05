import { Request, Response } from "express";

import { sessionService } from "../services/session.service.js";

class SessionController {
  // ----------------------------------
  // Create Session
  // ----------------------------------

  async create(
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

      const {
        contentId,
        title,
      } = req.body;

      if (!contentId) {
        return res.status(400).json({
          success: false,
          message:
            "contentId is required",
        });
      }

      const session =
        await sessionService.create({
          userId: req.user.id,
          contentId,
          title,
        });

      return res.status(201).json({
        success: true,
        data: session,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Internal Server Error",
      });
    }
  }

  // ----------------------------------
  // Get Sessions
  // ----------------------------------

  async getAll(
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

      const contentId =
        typeof req.query.contentId ===
        "string"
          ? req.query.contentId
          : undefined;

      const sessions =
        await sessionService.getSessions(
          req.user.id,
          contentId,
        );

      return res.json({
        success: true,
        data: sessions,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Internal Server Error",
      });
    }
  }

  // ----------------------------------
  // Get Messages
  // ----------------------------------

  async getMessages(
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

      const sessionId =
        Array.isArray(req.params.id)
          ? req.params.id[0]
          : req.params.id;

      const messages =
        await sessionService.getMessages(
          req.user.id,
          sessionId,
        );

      if (!messages) {
        return res.status(404).json({
          success: false,
          message:
            "Session not found",
        });
      }

      return res.json({
        success: true,
        data: messages,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Internal Server Error",
      });
    }
  }

  // ----------------------------------
  // Rename Session
  // ----------------------------------

  async rename(
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

      const sessionId =
        Array.isArray(req.params.id)
          ? req.params.id[0]
          : req.params.id;

      const title =
        req.body?.title;

      const session =
        await sessionService.rename(
          req.user.id,
          sessionId,
          title,
        );

      return res.json({
        success: true,
        data: session,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Internal Server Error",
      });
    }
  }

  // ----------------------------------
  // Delete Session
  // ----------------------------------

  async delete(
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

      const sessionId =
        Array.isArray(req.params.id)
          ? req.params.id[0]
          : req.params.id;

      const result =
        await sessionService.delete(
          req.user.id,
          sessionId,
        );

      return res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Internal Server Error",
      });
    }
  }
}

export const sessionController =
  new SessionController();