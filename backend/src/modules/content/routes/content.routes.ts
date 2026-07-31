import { Router } from "express";

import { authMiddleware } from "../../auth/middleware/auth.middleware.js";
import { uploadMiddleware } from "../upload/upload.middleware.js";
import { contentController } from "../controllers/content.controller.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  contentController.getAll.bind(contentController),
);

router.post(
  "/upload",
  authMiddleware,
  uploadMiddleware.single("file"),
  contentController.upload.bind(contentController),
);

export default router;