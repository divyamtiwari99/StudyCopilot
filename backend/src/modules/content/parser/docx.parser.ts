import mammoth from "mammoth";

import { BaseParser } from "./base.parser.js";

export class DocxParser extends BaseParser {

  supports(mimeType: string) {

    return mimeType.includes("wordprocessingml");

  }

  async parse(filePath: string) {

    const result = await mammoth.extractRawText({
      path: filePath,
    });

    return {

      title: "Word Document",

      pages: 1,

      text: result.value,

      metadata: {},

    };

  }

}

export const docxParser = new DocxParser();