import { Router } from "express";
import { uploadMiddleware } from "../upload/upload.middleware.js";
import { contentController } from "../controllers/content.controller.js";

const router = Router();

router.post(
  "/upload",
  uploadMiddleware.single("file"),
  contentController.upload.bind(contentController)
);

export default router;