import { env } from "../../../config/env.js";

export const aiConfig = {
  chatProvider: env.CHAT_AI_PROVIDER,
  visionProvider: env.VISION_AI_PROVIDER,
  groqTextModel: env.GROQ_TEXT_MODEL,
  groqVisionModel: env.GROQ_VISION_MODEL,
  geminiTextModel: env.GEMINI_TEXT_MODEL,
  geminiEmbeddingModel: env.GEMINI_EMBEDDING_MODEL,
  requestTimeoutMs: env.AI_REQUEST_TIMEOUT_MS,
  maxRetries: env.AI_MAX_RETRIES,
  maxConcurrentAiPerUser: env.MAX_CONCURRENT_AI_PER_USER,
  maxChatQuestionChars: env.MAX_CHAT_QUESTION_CHARS,
  maxChatHistoryMessages: env.MAX_CHAT_HISTORY_MESSAGES,
  maxChatSessions: env.MAX_CHAT_SESSIONS,
  maxRagDocuments: env.MAX_RAG_DOCUMENTS,
  maxRagChunks: env.MAX_RAG_CHUNKS,
  queueConcurrency: env.QUEUE_CONCURRENCY,
};
