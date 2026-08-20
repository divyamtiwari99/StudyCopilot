import { Router } from "express";

import { studyPlannerController } from "../controllers/study-planner.controller.js";

const router = Router();

router.post(
  "/generate",
  studyPlannerController.generate.bind(
    studyPlannerController,
  ),
);

router.post(
  "/regenerate",
  studyPlannerController.regenerate.bind(
    studyPlannerController,
  ),
);

router.get(
  "/:contentId",
  studyPlannerController.get.bind(
    studyPlannerController,
  ),
);

export default router;