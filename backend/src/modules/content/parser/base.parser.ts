import {
  ParsedContent,
  ContentParser,
} from "./parser.interface.js";

export abstract class BaseParser
  implements ContentParser
{
  abstract supports(
    mimeType: string
  ): boolean;

  abstract parse(
    filePath: string
  ): Promise<ParsedContent>;
}