import { Router } from "express";

import { authMiddleware } from "../../auth/middleware/auth.middleware.js";

import { notesController } from "../controllers/notes.controller.js";

const router = Router();

router.post(
  "/generate",
  authMiddleware,
  notesController.generate.bind(
    notesController
  )
);

router.get(
  "/:contentId",
  authMiddleware,
  notesController.get.bind(
    notesController
  )
);

export default router;