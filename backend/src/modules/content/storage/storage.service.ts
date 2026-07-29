import path from "path";
import fs from "fs/promises";

export class StorageService {

  async delete(
    filePath: string
  ): Promise<void> {

    try {
      await fs.unlink(filePath);
    } catch {}
  }

  absolutePath(filename: string) {
    return path.resolve(
      "uploads",
      filename
    );
  }

  exists(
    filename: string
  ) {

    return fs
      .access(this.absolutePath(filename))
      .then(() => true)
      .catch(() => false);
  }
}

export default new StorageService();