import { Router } from "express";

import { summaryController } from "../controllers/summary.controller.js";

const router = Router();

router.post(
  "/generate",
  summaryController.generate.bind(
    summaryController
  )
);

router.get(
  "/:contentId",
  summaryController.get.bind(
    summaryController
  )
);

export default router;