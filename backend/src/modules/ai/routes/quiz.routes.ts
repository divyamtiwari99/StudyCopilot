import { Router } from "express";

import { authMiddleware } from "../../auth/middleware/auth.middleware.js";

import { quizController } from "../controllers/quiz.controller.js";

const router = Router();

router.post(
  "/generate",
  authMiddleware,
  quizController.generate.bind(
    quizController
  )
);

router.get(
  "/:contentId",
  authMiddleware,
  quizController.get.bind(
    quizController
  )
);

export default router;