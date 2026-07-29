import {
  ContentParser,
} from "./parser.interface.js";

class ParserRegistry {

  private parsers: ContentParser[] = [];

  register(
    parser: ContentParser
  ) {
    this.parsers.push(parser);
  }

  resolve(
    mimeType: string
  ) {

    const parser =
      this.parsers.find((p) =>
        p.supports(mimeType)
      );

    if (!parser) {
      throw new Error(
        `No parser found for ${mimeType}`
      );
    }

    return parser;
  }
}

export default new ParserRegistry();