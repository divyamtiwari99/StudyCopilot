import { readFile } from "node:fs/promises";

import {
  extractText,
  getDocumentProxy,
} from "unpdf";

import { BaseParser } from "./base.parser.js";

export class PdfParser extends BaseParser {
  supports(mimeType: string): boolean {
    return mimeType === "application/pdf";
  }

  async parse(filePath: string) {
    console.log("\n==========================");
    console.log("📄 PDF PARSER");
    console.log("==========================");

    const buffer = await readFile(filePath);

    const pdf = await getDocumentProxy(
      new Uint8Array(buffer)
    );

    console.log(
      `Pages: ${pdf.numPages}`
    );

    const {
      text,
      totalPages,
    } = await extractText(pdf, {
      mergePages: true,
    });

    console.log(
      `Characters: ${text.length}`
    );

    console.log(
      `Single New Lines: ${
        (text.match(/\n/g) ?? []).length
      }`
    );

    console.log(
      `Double New Lines: ${
        (text.match(/\n\n/g) ?? []).length
      }`
    );

    console.log("\nPreview:\n");

    console.log(
      text.substring(0, 1000)
    );

    console.log(
      "\n==========================\n"
    );

    return {
      title: "PDF Document",
      pages: totalPages,
      text,
      metadata: {
        filePath,
      },
    };
  }
}

export const pdfParser =
  new PdfParser();