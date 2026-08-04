import { Router } from "express";

import { authMiddleware } from "../../auth/middleware/auth.middleware.js";

import { uploadMiddleware } from "../upload/upload.middleware.js";

import { contentController } from "../controllers/content.controller.js";

const router = Router();

// =====================
// Get All Documents
// =====================

router.get(
  "/",
  authMiddleware,
  contentController.getAll.bind(
    contentController,
  ),
);

// =====================
// Get Single Document
// =====================

router.get(
  "/:id",
  authMiddleware,
  contentController.getById.bind(
    contentController,
  ),
);

// =====================
// Upload Document
// =====================

router.post(
  "/upload",
  authMiddleware,
  uploadMiddleware.single("file"),
  contentController.upload.bind(
    contentController,
  ),
);

// =====================
// Rename Document
// =====================

router.patch(
  "/:id",
  authMiddleware,
  contentController.rename.bind(
    contentController,
  ),
);

// =====================
// Delete Document
// =====================

router.delete(
  "/:id",
  authMiddleware,
  contentController.delete.bind(
    contentController,
  ),
);

export default router;