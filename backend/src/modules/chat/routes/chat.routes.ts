import { Router } from "express";

import { chatController } from "../controllers/chat.controller.js";

const router = Router();

router.post(
  "/ask",
  chatController.ask.bind(chatController)
);

export default router;