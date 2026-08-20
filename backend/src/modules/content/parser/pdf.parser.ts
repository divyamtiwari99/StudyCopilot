import { readFile } from "node:fs/promises";
import { extractText, getDocumentProxy } from "unpdf";
import { BaseParser } from "./base.parser.js";

export class PdfParser extends BaseParser {
  supports(mimeType: string): boolean {
    return mimeType === "application/pdf";
  }

  async parse(filePath: string) {
    const buffer = await readFile(filePath);
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const { text, totalPages } = await extractText(pdf, { mergePages: true });

    return {
      title: "PDF Document",
      pages: totalPages,
      text,
      metadata: { filePath },
    };
  }
}

export const pdfParser = new PdfParser();
