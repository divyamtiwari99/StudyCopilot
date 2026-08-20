import type { RetrievedChunk } from "../types/chat.types.js";

export class ContextBuilderService {
  build(chunks: RetrievedChunk[]) {
    return chunks
      .map(
        (chunk, index) =>
          `[Source ${index + 1}] ${chunk.title || "Document section"}\n${chunk.text}`,
      )
      .join("\n\n----------------------\n\n");
  }
}

export const contextBuilderService = new ContextBuilderService();
