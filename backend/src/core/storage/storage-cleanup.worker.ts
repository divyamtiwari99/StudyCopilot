import { queueService } from "../queue/queue.service.js";
import { storageManager } from "./storage.manager.js";

interface StorageCleanupJob {
  key: string;
}

queueService.register<StorageCleanupJob>("storage.cleanup", async (payload) => {
  if (!payload?.key) return;
  await storageManager.delete(payload.key);
});
