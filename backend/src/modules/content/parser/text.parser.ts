import { readFile } from "node:fs/promises";

import { BaseParser } from "./base.parser.js";

export class TextParser extends BaseParser {
  supports(mimeType: string): boolean {
    return mimeType === "text/plain" || mimeType === "text/markdown";
  }

  async parse(filePath: string) {
    const text = await readFile(filePath, "utf8");

    return {
      title: "Text Document",
      pages: 1,
      text,
      metadata: {},
    };
  }
}

export const textParser = new TextParser();
