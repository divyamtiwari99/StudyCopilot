import { parserFactory } from "../parser/parser.factory.js";
import { normalizeText } from "../knowledge/normalizer.js";
import { createChunks } from "../knowledge/chunker.js";

import { chunkService } from "../services/chunk.service.js";
import { chunkEmbeddingService } from "../services/chunk-embedding.service.js";

import { statusService } from "./status.service.js";
import { ProcessingJob } from "./job.types.js";

export class PipelineService {
  async process(job: ProcessingJob) {
    try {
      console.log("🚀 Pipeline Started");

      await statusService.update(job.contentId, "parsing");

      console.log("📄 Getting parser...");

      const parser =
        parserFactory.getParser(job.mimeType);

      console.log("📄 Parsing file...");

      const parsed =
        await parser.parse(job.filePath);

      console.log("✅ Parse Complete");
      console.log(
        "Characters:",
        parsed.text.length
      );

      await statusService.update(
        job.contentId,
        "normalizing"
      );

      const normalized =
        normalizeText(parsed.text);

      console.log("✅ Normalize Complete");

      await statusService.update(
        job.contentId,
        "chunking"
      );

      const chunks =
        createChunks(normalized);

      console.log(
        "✅ Chunks Created:",
        chunks.length
      );

      // ==========================
      // DEBUG START
      // ==========================

      console.log("========== CHUNKS ==========");

      chunks.forEach((chunk, index) => {
        console.log({
          index,

          title: chunk.title,

          textType: typeof chunk.text,

          textLength:
            chunk.text?.length,

          preview:
            chunk.text?.substring(
              0,
              100
            ),
        });
      });

      console.log("============================");

      // ==========================
      // DEBUG END
      // ==========================

      await chunkService.saveChunks(
        job.contentId,
        chunks
      );

      console.log(
        "✅ Chunks Saved"
      );

      await statusService.update(
        job.contentId,
        "embedding"
      );

      await chunkEmbeddingService.process(
        job.contentId
      );

      console.log(
        "✅ Embeddings Complete"
      );

      await statusService.update(
        job.contentId,
        "completed"
      );

      console.log(
        "🎉 Pipeline Finished"
      );
    } catch (error) {
      console.error(
        "❌ PIPELINE ERROR"
      );

      console.error(error);

      await statusService.update(
        job.contentId,
        "failed"
      );

      throw error;
    }
  }
}

export const pipelineService =
  new PipelineService();