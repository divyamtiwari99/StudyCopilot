import multer from "multer";
import crypto from "crypto";
import path from "path";
import fs from "fs";

const uploadDirectory = path.resolve("uploads");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDirectory);
  },

  filename(req, file, cb) {
    const extension = path.extname(file.originalname);

    const filename =
      crypto.randomUUID() + extension;

    cb(null, filename);
  },
});

const allowedMimeTypes = [
  "application/pdf",

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  "application/vnd.openxmlformats-officedocument.presentationml.presentation",

  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

  "text/plain",

  "text/markdown",

  "image/png",
  "image/jpeg",
  "image/webp",

  "audio/mpeg",
  "audio/wav",

  "video/mp4",

  "application/zip",
];

export const uploadMiddleware = multer({
  storage,

  limits: {
    fileSize: 1024 * 1024 * 250,
  },

  fileFilter(req, file, cb) {
    if (
      allowedMimeTypes.includes(file.mimetype)
    ) {
      return cb(null, true);
    }

    cb(
      new Error(
        `Unsupported file type: ${file.mimetype}`
      )
    );
  },
});