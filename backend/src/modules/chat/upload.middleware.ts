import multer from "multer";
import os from "os";
import path from "path";
import fs from "fs";

const uploadDirectory = path.join(os.tmpdir(), "studycopilot", "chat-uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDirectory),
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120) || "attachment";
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${safeName}`);
  },
});

const allowedMimeTypes = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/markdown",
]);

export const CHAT_ATTACHMENT_MAX_SIZE = 50 * 1024 * 1024;
export const CHAT_ATTACHMENT_MAX_FILES = 4;

export const chatAttachmentUploadMiddleware = multer({
  storage,
  limits: {
    fileSize: CHAT_ATTACHMENT_MAX_SIZE,
    files: CHAT_ATTACHMENT_MAX_FILES,
  },
  fileFilter(_req, file, cb) {
    if (allowedMimeTypes.has(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(
      new Error(
        "Unsupported attachment type. Supported formats are PDF, DOCX, TXT, Markdown, PNG, JPEG and WebP.",
      ),
    );
  },
});
