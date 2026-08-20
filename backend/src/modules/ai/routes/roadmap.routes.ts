import { Router } from "express";

import { roadmapController } from "../controllers/roadmap.controller.js";

const router = Router();

router.post(
  "/generate",
  roadmapController.generate.bind(
    roadmapController,
  ),
);

router.post(
  "/regenerate",
  roadmapController.regenerate.bind(
    roadmapController,
  ),
);

router.get(
  "/:contentId",
  roadmapController.get.bind(
    roadmapController,
  ),
);

export default router;