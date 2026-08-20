import { ContentModel } from "../models/content.model.js";
import { parserFactory } from "../parser/parser.factory.js";
import { normalizeText } from "../knowledge/normalizer.js";
import { createChunks } from "../knowledge/chunker.js";
import { chunkService } from "../services/chunk.service.js";
import { chunkEmbeddingService } from "../services/chunk-embedding.service.js";
import { statusService } from "./status.service.js";
import type { ProcessingJob } from "./job.types.js";
import { AIProviderError } from "../../ai/providers/provider.error.js";

export class PipelineService {
  async process(job: ProcessingJob & { filePath: string }) {
    const content = await ContentModel.findOne({
      _id: job.contentId,
      userId: job.userId,
    }).lean();

    if (!content || content.storage.key !== job.storageKey) return;

    const ensureActive = async () => {
      const active = await ContentModel.findOne({
        _id: job.contentId,
        userId: job.userId,
      })
        .select("_id storage.key status")
        .lean();

      if (!active || active.storage.key !== job.storageKey || active.status === "failed") {
        throw new Error("Document processing was cancelled.");
      }
    };

    try {
      await ensureActive();
      const parser = parserFactory.getParser(job.mimeType);
      const parsed = await parser.parse(job.filePath);
      await ensureActive();
      await statusService.update(job.userId, job.contentId, "parsing", { pages: parsed.pages });

      const normalized = normalizeText(parsed.text);
      if (!normalized) throw new Error("Document does not contain readable text.");
      await statusService.update(job.userId, job.contentId, "normalizing");

      await ensureActive();
      await statusService.update(job.userId, job.contentId, "chunking");
      await chunkService.replaceChunks(job.contentId, createChunks(normalized));

      await ensureActive();
      await statusService.update(job.userId, job.contentId, "embedding");
      let embeddingsReady = true;
      try {
        await chunkEmbeddingService.process(job.contentId, job.userId, async () => {
          await ensureActive();
        });
      } catch (error) {
        if (!(error instanceof AIProviderError)) throw error;
        // Embeddings are an optimization for semantic RAG, not a prerequisite
        // for a usable document. Lexical retrieval already has a safe fallback.
        // Keep the document ready when Gemini embedding quota/rate limits are
        // temporarily unavailable instead of leaving the upload stuck/failed.
        embeddingsReady = false;
      }

      await ensureActive();
      await statusService.update(job.userId, job.contentId, "completed", { embeddingsReady });
    } catch (error) {
      // Keep successfully parsed chunks/embeddings when a later stage fails.
      // This allows lexical RAG to keep working while Gemini embeddings recover.
      await statusService.update(job.userId, job.contentId, "failed").catch(() => undefined);
      throw error;
    }
  }
}

export const pipelineService = new PipelineService();
