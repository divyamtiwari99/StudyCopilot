import multer from "multer";
import os from "os";
import path from "path";
import fs from "fs";

const uploadDirectory = path.join(os.tmpdir(), "studycopilot", "content-uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDirectory),
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120) || "document";
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${safeName}`);
  },
});

const allowedMimeTypes = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/markdown",
]);

export const CONTENT_UPLOAD_MAX_SIZE = 50 * 1024 * 1024;

export const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: CONTENT_UPLOAD_MAX_SIZE,
  },
  fileFilter(_req, file, cb) {
    if (allowedMimeTypes.has(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(
      new Error(
        `Unsupported file type: ${file.mimetype}. Supported formats are PDF, DOCX, TXT and Markdown.`,
      ),
    );
  },
});
