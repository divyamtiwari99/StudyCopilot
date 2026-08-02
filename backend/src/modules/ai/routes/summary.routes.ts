import { Router } from "express";

import { authMiddleware } from "../../auth/middleware/auth.middleware.js";

import { summaryController } from "../controllers/summary.controller.js";

const router = Router();

router.post(
  "/generate",
  authMiddleware,
  summaryController.generate.bind(
    summaryController
  )
);

router.get(
  "/:contentId",
  authMiddleware,
  summaryController.get.bind(
    summaryController
  )
);

export default router;