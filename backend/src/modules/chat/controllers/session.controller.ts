import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { sessionService } from "../services/session.service.js";
import { sessionContextSchema, sessionCreateSchema, sessionRenameSchema } from "../validation.js";

function paramId(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] : value; }

class SessionController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
      const input = sessionCreateSchema.parse(req.body ?? {});
      const session = await sessionService.create({ ...input, userId: req.user.id });
      return res.status(201).json({ success: true, data: session });
    } catch (error) {
      if (error instanceof ZodError) return res.status(400).json({ success: false, message: "Invalid session data." });
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
      const contentId = typeof req.query.contentId === "string" ? req.query.contentId : undefined;
      const scope = req.query.scope === "document" ? "document" : "tutor";
      return res.json({ success: true, data: await sessionService.getSessions(req.user.id, contentId, scope) });
    } catch (error) {
      next(error);
    }
  }

  async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
      const sessionId = paramId(req.params.id);
      if (!sessionId) return res.status(400).json({ success: false, message: "Session ID is required." });
      const rawLimit = typeof req.query.limit === "string" ? Number(req.query.limit) : undefined;
      const limit = Number.isFinite(rawLimit) ? rawLimit : undefined;
      const before = typeof req.query.before === "string" ? req.query.before : undefined;
      const page = await sessionService.getMessagesPage(req.user.id, sessionId, { limit, before });
      if (!page) return res.status(404).json({ success: false, message: "Session not found." });
      res.setHeader("X-Chat-Has-More", page.hasMore ? "true" : "false");
      if (page.nextCursor) res.setHeader("X-Chat-Next-Cursor", page.nextCursor);
      return res.json({ success: true, data: page.messages });
    } catch (error) {
      next(error);
    }
  }

  async updateContext(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
      const sessionId = paramId(req.params.id);
      if (!sessionId) return res.status(400).json({ success: false, message: "Session ID is required." });
      const { documentIds } = sessionContextSchema.parse(req.body ?? {});
      const session = await sessionService.updateContext(req.user.id, sessionId, documentIds);
      if (!session) return res.status(404).json({ success: false, message: "Session not found." });
      return res.json({ success: true, data: session });
    } catch (error) {
      if (error instanceof ZodError) return res.status(400).json({ success: false, message: "Invalid document context." });
      next(error);
    }
  }

  async rename(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
      const sessionId = paramId(req.params.id);
      if (!sessionId) return res.status(400).json({ success: false, message: "Session ID is required." });
      const { title } = sessionRenameSchema.parse(req.body ?? {});
      const session = await sessionService.rename(req.user.id, sessionId, title);
      if (!session) return res.status(404).json({ success: false, message: "Session not found." });
      return res.json({ success: true, data: session });
    } catch (error) {
      if (error instanceof ZodError) return res.status(400).json({ success: false, message: "Invalid title." });
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
      const sessionId = paramId(req.params.id);
      if (!sessionId) return res.status(400).json({ success: false, message: "Session ID is required." });
      const result = await sessionService.delete(req.user.id, sessionId);
      if (!result) return res.status(404).json({ success: false, message: "Session not found." });
      return res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}

export const sessionController = new SessionController();
