import { BaseParser } from "./base.parser.js";

export class ImageParser extends BaseParser {

  supports(
    mimeType: string
  ) {

    return mimeType.startsWith("image/");

  }

  async parse() {

    return {

      title: "Image",

      pages: 1,

      text: "",

      metadata: {},

    };

  }

}

export const imageParser =
  new ImageParser();