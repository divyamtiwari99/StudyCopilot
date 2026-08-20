import { z } from "zod";
import { tempFileService } from "../../../core/storage/temp-file.service.js";
import { storageManager } from "../../../core/storage/storage.manager.js";
import { queueService } from "../../../core/queue/queue.service.js";
import { ContentModel } from "../models/content.model.js";
import { pipelineService } from "./pipeline.service.js";

const processingJobSchema = z.object({
  userId: z.string().min(1),
  contentId: z.string().min(1),
  storageKey: z.string().min(1),
  mimeType: z.string().min(1),
  stage: z.enum(["uploaded", "parsing", "normalizing", "chunking", "knowledge", "embedding", "summarizing", "flashcards", "quiz", "notes", "studyPlanner", "completed", "failed"]),
});

queueService.register<unknown>("content.process", async (rawPayload) => {
  const payloadResult = processingJobSchema.safeParse(rawPayload);

  if (!payloadResult.success) {
    const candidate = rawPayload && typeof rawPayload === "object" ? rawPayload as Record<string, unknown> : null;
    const userId = typeof candidate?.userId === "string" ? candidate.userId : null;
    const contentId = typeof candidate?.contentId === "string" ? candidate.contentId : null;

    if (userId && contentId) {
      await ContentModel.findOneAndUpdate(
        { _id: contentId, userId, status: "processing" },
        { $set: { status: "failed" } },
      ).catch(() => undefined);
    }

    throw new Error(`Invalid content processing payload: ${payloadResult.error.message}`);
  }

  const payload = payloadResult.data;
  const content = await ContentModel.findOne({ _id: payload.contentId, userId: payload.userId }).lean();
  if (!content || content.status === "completed" || content.storage.key !== payload.storageKey) return;

  const buffer = await storageManager.download(payload.storageKey);
  const temp = await tempFileService.create(buffer, content.storage.extension || ".bin");
  try {
    await pipelineService.process({ ...payload, filePath: temp.filePath });
  } finally {
    await tempFileService.delete(temp.filePath);
  }
});
