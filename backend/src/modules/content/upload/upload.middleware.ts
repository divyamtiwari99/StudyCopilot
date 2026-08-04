import multer from "multer";

const storage =
  multer.memoryStorage();

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

export const uploadMiddleware =
  multer({

    storage,

    limits: {

      fileSize:
        1024 * 1024 * 250,

    },

    fileFilter(
      req,
      file,
      cb,
    ) {

      if (
        allowedMimeTypes.includes(
          file.mimetype,
        )
      ) {

        return cb(
          null,
          true,
        );

      }

      cb(
        new Error(
          `Unsupported file type: ${file.mimetype}`,
        ),
      );

    },

  });