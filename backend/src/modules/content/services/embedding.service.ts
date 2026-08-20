import { geminiProvider } from "../../ai/providers/gemini.provider.js";
import { AIProviderError } from "../../ai/providers/provider.error.js";
import { aiConfig } from "../../ai/config/ai.config.js";

const activeEmbeddingsByUser = new Map<string, number>();
let activeEmbeddings = 0;

export class EmbeddingService {
  async generate(text: string, userId?: string): Promise<number[]> {
    if (!text.trim()) throw new AIProviderError("gemini", "bad_request", "Cannot generate an embedding for empty text.", 400);

    const globalLimit = Math.max(1, aiConfig.maxConcurrentAiPerUser * 2);
    const userLimit = Math.max(1, aiConfig.maxConcurrentAiPerUser);
    const userActive = userId ? activeEmbeddingsByUser.get(userId) ?? 0 : 0;

    if (activeEmbeddings >= globalLimit || userActive >= userLimit) {
      throw new AIProviderError("gemini", "rate_limit", "Embedding service is busy. Please retry later.", 429, true);
    }

    activeEmbeddings += 1;
    if (userId) activeEmbeddingsByUser.set(userId, userActive + 1);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), aiConfig.requestTimeoutMs);
    try {
      return await geminiProvider.generateEmbedding(text, controller.signal);
    } finally {
      clearTimeout(timer);
      activeEmbeddings -= 1;
      if (userId) {
        const remaining = (activeEmbeddingsByUser.get(userId) ?? 1) - 1;
        if (remaining <= 0) activeEmbeddingsByUser.delete(userId);
        else activeEmbeddingsByUser.set(userId, remaining);
      }
    }
  }
}

export const embeddingService = new EmbeddingService();
