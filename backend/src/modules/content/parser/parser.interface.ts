export interface ParsedContent {

  title: string;

  pages: number;

  text: string;

  metadata: Record<
    string,
    unknown
  >;
}

export interface ContentParser {

  supports(
    mimeType: string
  ): boolean;

  parse(
    filePath: string
  ): Promise<ParsedContent>;
}