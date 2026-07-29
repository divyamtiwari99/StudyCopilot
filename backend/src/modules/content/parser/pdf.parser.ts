import { BaseParser } from "./base.parser.js";

export class PdfParser extends BaseParser {
  supports(mimeType: string): boolean {
    return mimeType === "application/pdf";
  }

  async parse(filePath: string) {
    // TODO: unpdf implementation (next sprint)

    return {
      title: "PDF Document",
      pages: 0,
      text: "",
      metadata: {
        filePath,
      },
    };
  }
}

export const pdfParser = new PdfParser();