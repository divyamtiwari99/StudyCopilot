import { ChunkModel } from "../models/chunk.model.js";

import { EmbeddingModel } from "../models/embedding.model.js";

import { embeddingService } from "./embedding.service.js";

export class ChunkEmbeddingService {

  async process(contentId: string) {

    const chunks =
      await ChunkModel.find({
        contentId,
      });

    for (const chunk of chunks) {

      const vector =
        await embeddingService.generate(
          chunk.text
        );

      await EmbeddingModel.create({

        chunkId: chunk._id,

        vector,

        dimensions: vector.length,

        model: "text-embedding-004",

      });

      chunk.embeddingStatus =
        "completed";

      await chunk.save();

    }

  }

}

export const chunkEmbeddingService =
  new ChunkEmbeddingService();