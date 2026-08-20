import { Router } from "express";

import { authMiddleware } from "../../auth/middleware/auth.middleware.js";
import { rateLimit } from "../../../middleware/rate-limit.middleware.js";
import { env } from "../../../config/env.js";
import { chatAttachmentUploadMiddleware } from "../upload.middleware.js";

import { chatController } from "../controllers/chat.controller.js";
import { sessionController } from "../controllers/session.controller.js";

const router = Router();

router.post(
  "/ask",
  authMiddleware,
  rateLimit({
    name: "chat-ai",
    windowMs: 5 * 60_000,
    max: env.AI_RATE_LIMIT_PER_5_MINUTES,
    key: (req) => req.user?.id || req.ip || "unknown",
  }),
  chatAttachmentUploadMiddleware.array("attachments", 4),
  chatController.ask.bind(chatController),
);

router.post(
  "/sessions/:id/messages/:messageId/retry",
  authMiddleware,
  chatController.retry.bind(chatController),
);

router.post(
  "/sessions",
  authMiddleware,
  sessionController.create.bind(sessionController),
);

router.get(
  "/sessions",
  authMiddleware,
  sessionController.getAll.bind(sessionController),
);

router.get(
  "/sessions/:id/messages",
  authMiddleware,
  sessionController.getMessages.bind(sessionController),
);

router.patch(
  "/sessions/:id/context",
  authMiddleware,
  sessionController.updateContext.bind(sessionController),
);

router.patch(
  "/sessions/:id",
  authMiddleware,
  sessionController.rename.bind(sessionController),
);

router.delete(
  "/sessions/:id",
  authMiddleware,
  sessionController.delete.bind(sessionController),
);

export default router;
