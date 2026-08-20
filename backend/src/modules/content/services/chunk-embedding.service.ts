import { ChunkModel } from "../models/chunk.model.js";
import { EmbeddingModel } from "../models/embedding.model.js";
import { embeddingService } from "./embedding.service.js";
import { aiConfig } from "../../ai/config/ai.config.js";

export class ChunkEmbeddingService {
  async process(contentId: string, userId: string, ensureActive?: () => Promise<void>) {
    const chunks = await ChunkModel.find({ contentId }).sort({ order: 1 });

    for (const chunk of chunks) {
      await ensureActive?.();

      const alreadyExists = await EmbeddingModel.findOne({
        chunkId: chunk._id,
        model: aiConfig.geminiEmbeddingModel,
      });
      if (alreadyExists) {
        if (chunk.embeddingStatus !== "completed") {
          chunk.embeddingStatus = "completed";
          await chunk.save();
        }
        continue;
      }

      await EmbeddingModel.deleteMany({
        chunkId: chunk._id,
        model: { $ne: aiConfig.geminiEmbeddingModel },
      });

      const vector = await embeddingService.generate(chunk.text, userId);
      if (!vector.length) {
        throw new Error(`Embedding generation returned an empty vector for chunk ${chunk._id.toString()}.`);
      }

      await ensureActive?.();
      const createdEmbedding = await EmbeddingModel.create({
        contentId,
        chunkId: chunk._id,
        vector,
        dimensions: vector.length,
        model: aiConfig.geminiEmbeddingModel,
      }).catch(async (error: unknown) => {
        if (!(typeof error === "object" && error !== null && "code" in error && error.code === 11000)) throw error;
        const existing = await EmbeddingModel.findOne({ chunkId: chunk._id, model: aiConfig.geminiEmbeddingModel });
        if (!existing) throw error;
        return existing;
      });

      try {
        await ensureActive?.();
      } catch (error) {
        if (createdEmbedding) await EmbeddingModel.deleteOne({ _id: createdEmbedding._id }).catch(() => undefined);
        throw error;
      }

      chunk.embeddingStatus = "completed";
      await chunk.save();
    }
  }
}

export const chunkEmbeddingService = new ChunkEmbeddingService();
