import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { chatRequestSchema } from "../validation.js";
import { chatService } from "../services/chat.service.js";

function parseDocumentIds(value: unknown): string[] | undefined {
  if (value === undefined) return undefined;
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string");
  if (typeof value !== "string") throw new Error("documentIds must be an array.");
  const parsed: unknown = JSON.parse(value);
  if (!Array.isArray(parsed)) throw new Error("documentIds must be a JSON array.");
  return parsed.filter((item): item is string => typeof item === "string");
}

class ChatController {
  async retry(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
      const sessionId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const messageId = Array.isArray(req.params.messageId) ? req.params.messageId[0] : req.params.messageId;
      if (!messageId || messageId.length > 100) {
        return res.status(400).json({ success: false, message: "Invalid chat message identifier." });
      }
      const result = await chatService.retryMessage(req.user.id, sessionId, messageId);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async ask(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
      const files = Array.isArray(req.files) ? req.files : [];
      const raw = {
        sessionId: typeof req.body?.sessionId === "string" ? req.body.sessionId : undefined,
        contentId: typeof req.body?.contentId === "string" ? req.body.contentId : undefined,
        documentIds: parseDocumentIds(req.body?.documentIds),
        question: typeof req.body?.question === "string" ? req.body.question : "",
        mode: req.body?.mode,
        responseLength: req.body?.responseLength,
        citations: req.body?.citations,
        deepReasoning: req.body?.deepReasoning,
        requestId: typeof req.body?.requestId === "string" ? req.body.requestId : undefined,
      };
      const input = chatRequestSchema.parse(raw);
      if (!input.question && files.length === 0) {
        return res.status(400).json({ success: false, message: "Question or attachment is required." });
      }
      return res.json(await chatService.ask(req.user.id, input, files));
    } catch (error) {
      if (error instanceof SyntaxError || error instanceof ZodError) {
        return res.status(400).json({ success: false, message: "Invalid chat request." });
      }
      next(error);
    }
  }
}

export const chatController = new ChatController();
