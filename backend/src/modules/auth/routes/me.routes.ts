import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { meController } from "../controllers/me.controller.js";

const router = Router();

router.get(
  "/me",
  authMiddleware,
  meController.me.bind(
    meController
  )
);

export default router;