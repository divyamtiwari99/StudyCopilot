import parserRegistry from "./parser.registry.js";
import { ContentParser } from "./parser.interface.js";

export class ParserFactory {
  getParser(mimeType: string): ContentParser {
    return parserRegistry.resolve(mimeType);
  }
}

export const parserFactory = new ParserFactory();