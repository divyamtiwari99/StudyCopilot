import os from "os";
import path from "path";
import crypto from "crypto";

import fs from "fs/promises";

export class TempFileService {

  private readonly directory =
    path.join(
      os.tmpdir(),
      "studycopilot",
    );

  async create(
    buffer: Buffer,
    extension: string,
  ) {

    await fs.mkdir(
      this.directory,
      {
        recursive: true,
      },
    );

    const filename =
      `${crypto.randomUUID()}${extension}`;

    const filePath =
      path.join(
        this.directory,
        filename,
      );

    await fs.writeFile(
      filePath,
      buffer,
    );

    return {
      filePath,
      filename,
    };

  }

  async delete(
    filePath: string,
  ) {

    try {

      await fs.unlink(
        filePath,
      );

    } catch {}

  }

}

export const tempFileService =
  new TempFileService();