import { Router } from "express";

import { authMiddleware } from "../../auth/middleware/auth.middleware.js";

import { flashcardsController } from "../controllers/flashcards.controller.js";

const router = Router();

router.post(
  "/generate",
  authMiddleware,
  flashcardsController.generate.bind(
    flashcardsController
  )
);

router.get(
  "/:contentId",
  authMiddleware,
  flashcardsController.get.bind(
    flashcardsController
  )
);

export default router;