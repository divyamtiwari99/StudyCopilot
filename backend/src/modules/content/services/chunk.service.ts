import { ChunkModel } from "../models/chunk.model.js";
import { ContentChunk } from "../knowledge/chunk.types.js";

export class ChunkService {
  async saveChunks(
    contentId: string,
    chunks: ContentChunk[]
  ) {
    if (chunks.length === 0) return;

    await ChunkModel.insertMany(
      chunks.map((chunk) => ({
        contentId,

        order: chunk.order,

        title: chunk.title,

        text: chunk.text,

        tokens: chunk.tokens,

        embeddingStatus: "pending",
      }))
    );
  }
}

export const chunkService =
  new ChunkService();