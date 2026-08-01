import { ChunkModel } from "../../content/models/chunk.model.js";
import { EmbeddingModel } from "../../content/models/embedding.model.js";

import { embeddingService } from "../../content/services/embedding.service.js";
import { vectorSearchService } from "../../content/services/vector-search.service.js";

export class RetrievalService {
  async retrieve(
    contentId: string,
    question: string
  ) {
    const questionVector =
      await embeddingService.generate(question);

    // -----------------------------
    // Current document chunks
    // -----------------------------

    const chunks =
      await ChunkModel.find(
        {
          contentId,
        },
        {
          _id: 1,
          title: 1,
          text: 1,
          order: 1,
        }
      ).lean();

    if (chunks.length === 0) {
      return [];
    }

    // -----------------------------
    // Current document embeddings
    // -----------------------------

    const embeddings =
      await EmbeddingModel.find({
        chunkId: {
          $in: chunks.map(
            (chunk) => chunk._id
          ),
        },
      }).lean();

    if (embeddings.length === 0) {
      return [];
    }

    // -----------------------------
    // Fast lookup
    // -----------------------------

    const chunkMap =
      new Map(
        chunks.map((chunk) => [
          chunk._id.toString(),
          chunk,
        ])
      );

    // -----------------------------
    // Similarity
    // -----------------------------

    const scored =
      embeddings
        .map((embedding) => ({
          chunk:
            chunkMap.get(
              embedding.chunkId.toString()
            ),
          score:
            vectorSearchService.cosineSimilarity(
              questionVector,
              embedding.vector
            ),
        }))
        .filter(
          (
            item
          ): item is {
            chunk: NonNullable<
              typeof item.chunk
            >;
            score: number;
          } => !!item.chunk
        )
        .sort(
          (a, b) =>
            b.score - a.score
        );

    console.log(
      "\n=========== Similarity ==========="
    );

    scored.forEach(
      (item, index) => {
        console.log(
          `${index + 1}. ${item.score.toFixed(
            4
          )} -> ${
            item.chunk.title
          }`
        );
      }
    );

    console.log(
      "==================================\n"
    );

    // -----------------------------
    // Threshold
    // -----------------------------

    const threshold = 0.55;

    const relevant =
      scored.filter(
        (item) =>
          item.score >= threshold
      );

    const topChunks =
      relevant.length > 0
        ? relevant.slice(0, 3)
        : scored.slice(0, 3);

    // -----------------------------
    // Add neighbour chunks
    // -----------------------------

    const selected =
      new Map<
        string,
        (typeof chunks)[number]
      >();

    for (const item of topChunks) {
      const order =
        item.chunk.order;

      const neighbours =
        chunks.filter(
          (chunk) =>
            Math.abs(
              chunk.order -
                order
            ) <= 1
        );

      for (const neighbour of neighbours) {
        selected.set(
          neighbour._id.toString(),
          neighbour
        );
      }
    }

    const finalChunks =
      Array.from(
        selected.values()
      ).sort(
        (a, b) =>
          a.order - b.order
      );

    console.log(
      "\n=========== Retrieval ==========="
    );

    console.log(
      "Chunks in document:",
      chunks.length
    );

    console.log(
      "Embeddings:",
      embeddings.length
    );

    console.log(
      "Top Similar:",
      topChunks.length
    );

    console.log(
      "Selected Chunks:",
      finalChunks.length
    );

    console.log(
      "=================================\n"
    );

    return finalChunks;
  }
}

export const retrievalService =
  new RetrievalService();