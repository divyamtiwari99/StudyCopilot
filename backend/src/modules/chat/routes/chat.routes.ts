import { Router } from "express";

import { authMiddleware } from "../../auth/middleware/auth.middleware.js";

import { chatController } from "../controllers/chat.controller.js";
import { sessionController } from "../controllers/session.controller.js";

const router = Router();

// ======================================
// Chat
// ======================================

router.post(
  "/ask",
  authMiddleware,
  chatController.ask.bind(
    chatController,
  ),
);

// ======================================
// Sessions
// ======================================

router.post(
  "/sessions",
  authMiddleware,
  sessionController.create.bind(
    sessionController,
  ),
);

router.get(
  "/sessions",
  authMiddleware,
  sessionController.getAll.bind(
    sessionController,
  ),
);

router.get(
  "/sessions/:id/messages",
  authMiddleware,
  sessionController.getMessages.bind(
    sessionController,
  ),
);

router.patch(
  "/sessions/:id",
  authMiddleware,
  sessionController.rename.bind(
    sessionController,
  ),
);

router.delete(
  "/sessions/:id",
  authMiddleware,
  sessionController.delete.bind(
    sessionController,
  ),
);

export default router;