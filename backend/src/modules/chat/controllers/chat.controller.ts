import { Request, Response } from "express";

import { chatService } from "../services/chat.service.js";

class ChatController {
  async ask(req: Request, res: Response) {
    try {
      const { contentId, question } = req.body;

      if (!contentId || !question) {
        return res.status(400).json({
          success: false,
          message: "contentId and question are required",
        });
      }

      const answer = await chatService.ask(
        contentId,
        question
      );

      return res.json({
        success: true,
        answer,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
}

export const chatController =
  new ChatController();