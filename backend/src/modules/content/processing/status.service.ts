import { ContentModel } from "../models/content.model.js";
import type { ProcessingStage } from "./job.types.js";

const stageFlags: Partial<Record<ProcessingStage, string>> = {
  parsing: "parser",
  normalizing: "normalized",
};

export class StatusService {
  async update(
    userId: string,
    contentId: string,
    stage: ProcessingStage,
    metadata?: { pages?: number; embeddingsReady?: boolean },
  ) {
    const $set: Record<string, unknown> = {};

    if (stage === "completed") {
      $set.status = "completed";
      $set["processing.embeddings"] = metadata?.embeddingsReady !== false;
    } else if (stage === "failed") {
      // Preserve completed stage flags so partially processed documents remain useful.
      // In particular, lexical RAG can still use chunks when Gemini embeddings are temporarily unavailable.
      $set.status = "failed";
    } else {
      $set.status = "processing";
    }

    if (typeof metadata?.pages === "number" && metadata.pages > 0) {
      $set.pages = Math.floor(metadata.pages);
    }

    const flag = stageFlags[stage];
    if (flag) $set[`processing.${flag}`] = true;

    await ContentModel.findOneAndUpdate(
      { _id: contentId, userId },
      { $set },
    );
  }
}

export const statusService = new StatusService();
