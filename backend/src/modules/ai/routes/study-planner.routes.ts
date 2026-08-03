import { Router } from "express";

import { authMiddleware } from "../../auth/middleware/auth.middleware.js";

import { studyPlannerController } from "../controllers/study-planner.controller.js";

const router = Router();

router.post(
  "/generate",
  authMiddleware,
  studyPlannerController.generate.bind(
    studyPlannerController,
  ),
);

router.post(
  "/regenerate",
  authMiddleware,
  studyPlannerController.regenerate.bind(
    studyPlannerController,
  ),
);

router.get(
  "/:contentId",
  authMiddleware,
  studyPlannerController.get.bind(
    studyPlannerController,
  ),
);

export default router;