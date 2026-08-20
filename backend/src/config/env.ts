import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const booleanFromEnv = z.preprocess((value) => {
  if (typeof value === "boolean") return value;
  if (typeof value !== "string") return value;
  const normalized = value.trim().toLowerCase();
  if (normalized === "true") return true;
  if (normalized === "false") return false;
  return value;
}, z.boolean());

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(5000),
  FRONTEND_URL: z.union([z.string().url(), z.literal("")]).default(""),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required"),
  GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY is required"),
  CHAT_AI_PROVIDER: z.enum(["groq", "gemini"]).default("groq"),
  VISION_AI_PROVIDER: z.enum(["groq", "gemini"]).default("gemini"),
  GROQ_TEXT_MODEL: z.string().min(1).default("qwen/qwen3.6-27b"),
  GROQ_VISION_MODEL: z.string().min(1).default("qwen/qwen3.6-27b"),
  GEMINI_TEXT_MODEL: z.string().min(1).default("gemini-3.6-flash"),
  GEMINI_EMBEDDING_MODEL: z.string().min(1).default("gemini-embedding-001"),
  AI_REQUEST_TIMEOUT_MS: z.coerce.number().int().min(5000).max(120000).default(60000),
  AI_MAX_RETRIES: z.coerce.number().int().min(0).max(4).default(2),
  MAX_CONCURRENT_AI_PER_USER: z.coerce.number().int().min(1).max(20).default(2),
  MAX_CHAT_QUESTION_CHARS: z.coerce.number().int().min(1000).max(100000).default(20000),
  MAX_CHAT_HISTORY_MESSAGES: z.coerce.number().int().min(20).max(500).default(200),
  MAX_CHAT_SESSIONS: z.coerce.number().int().min(20).max(500).default(100),
  MAX_RAG_DOCUMENTS: z.coerce.number().int().min(1).max(50).default(20),
  MAX_RAG_CHUNKS: z.coerce.number().int().min(100).max(20000).default(5000),
  QUEUE_CONCURRENCY: z.coerce.number().int().min(1).max(16).default(2),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  JWT_REFRESH_SECRET: z.string().min(1, "JWT_REFRESH_SECRET is required"),
  SUPABASE_URL: z.string().url("SUPABASE_URL must be a valid URL"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY is required"),
  SUPABASE_BUCKET: z.string().min(1).default("documents"),
  DEFAULT_PLAN_NAME: z.string().trim().min(1).max(50).default("Free"),
  STORAGE_LIMIT_GB: z.coerce.number().positive().max(10000).default(5),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  TRUST_PROXY: booleanFromEnv.default(false),
  REFRESH_COOKIE_NAME: z.string().regex(/^[A-Za-z0-9_-]{3,64}$/).default("studycopilot_refresh"),
  CSRF_COOKIE_NAME: z.string().regex(/^[A-Za-z0-9_-]{3,64}$/).default("studycopilot_csrf"),
  API_RATE_LIMIT_PER_MINUTE: z.coerce.number().int().min(30).max(5000).default(300),
  AUTH_RATE_LIMIT_PER_MINUTE: z.coerce.number().int().min(3).max(120).default(12),
  AI_RATE_LIMIT_PER_5_MINUTES: z.coerce.number().int().min(5).max(300).default(30),
  UPLOAD_RATE_LIMIT_PER_10_MINUTES: z.coerce.number().int().min(2).max(120).default(20),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const details = parsed.error.issues
    .map((issue) => `${issue.path.join(".") || "environment"}: ${issue.message}`)
    .join("; ");
  throw new Error(`Invalid server configuration: ${details}`);
}

if (parsed.data.NODE_ENV === "production") {
  if (!parsed.data.FRONTEND_URL) {
    throw new Error("Invalid server configuration: FRONTEND_URL is required in production.");
  }
  if (parsed.data.JWT_SECRET.length < 32 || parsed.data.JWT_REFRESH_SECRET.length < 32) {
    throw new Error("Invalid server configuration: JWT secrets must be at least 32 characters in production.");
  }
}

export const env = parsed.data;
