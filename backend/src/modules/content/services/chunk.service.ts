import { ChunkModel } from "../models/chunk.model.js";
import { EmbeddingModel } from "../models/embedding.model.js";
import type { ContentChunk } from "../knowledge/chunk.types.js";

export class ChunkService {
  async replaceChunks(contentId: string, chunks: ContentChunk[]) {
    await EmbeddingModel.deleteMany({ contentId });
    await ChunkModel.deleteMany({ contentId });
    if (!chunks.length) return;

    await ChunkModel.insertMany(
      chunks.map((chunk) => ({
        contentId,
        order: chunk.order,
        title: chunk.title,
        text: chunk.text,
        tokens: chunk.tokens,
        embeddingStatus: "pending",
      })),
    );
  }

  async saveChunks(contentId: string, chunks: ContentChunk[]) {
    return this.replaceChunks(contentId, chunks);
  }
}

export const chunkService = new ChunkService();
