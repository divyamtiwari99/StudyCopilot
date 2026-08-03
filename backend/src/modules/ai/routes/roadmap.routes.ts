import { Router } from "express";

import { authMiddleware } from "../../auth/middleware/auth.middleware.js";

import { roadmapController } from "../controllers/roadmap.controller.js";

const router = Router();

router.post(
  "/generate",
  authMiddleware,
  roadmapController.generate.bind(
    roadmapController,
  ),
);

router.post(
  "/regenerate",
  authMiddleware,
  roadmapController.regenerate.bind(
    roadmapController,
  ),
);

router.get(
  "/:contentId",
  authMiddleware,
  roadmapController.get.bind(
    roadmapController,
  ),
);

export default router;