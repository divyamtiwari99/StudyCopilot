import { Router } from "express";

import { quizController } from "../controllers/quiz.controller.js";

const router = Router();

router.post(
  "/generate",
  quizController.generate.bind(
    quizController
  )
);

router.get(
  "/",
  quizController.getAll.bind(
    quizController
  )
);

router.get(
  "/:contentId",
  quizController.get.bind(
    quizController
  )
);

router.delete(
  "/:contentId",
  quizController.delete.bind(
    quizController
  )
);

export default router;