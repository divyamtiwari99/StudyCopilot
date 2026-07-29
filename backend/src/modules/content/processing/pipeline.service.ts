import { parserFactory } from "../parser/parser.factory.js";
import { normalizeText } from "../knowledge/normalizer.js";
import { createChunks } from "../knowledge/chunker.js";
import { chunkService } from "../services/chunk.service.js";

import { statusService } from "./status.service.js";
import { ProcessingJob } from "./job.types.js";

export class PipelineService {
  async process(job: ProcessingJob) {
    await statusService.update(
      job.contentId,
      "parsing"
    );

    const parser =
      parserFactory.getParser(
        job.mimeType
      );

    const parsed =
      await parser.parse(
        job.filePath
      );

    await statusService.update(
      job.contentId,
      "normalizing"
    );

    const normalized =
      normalizeText(
        parsed.text
      );

    await statusService.update(
      job.contentId,
      "chunking"
    );

    const chunks =
      createChunks(
        normalized
      );

    await chunkService.saveChunks(
      job.contentId,
      chunks
    );

    await statusService.update(
      job.contentId,
      "completed"
    );
  }
}

export const pipelineService =
  new PipelineService();