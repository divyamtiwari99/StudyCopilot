import { AppError } from "../../../core/errors/app.error.js";
import type { AIProviderName } from "../types/provider.types.js";

export type AIProviderErrorCode =
  | "rate_limit"
  | "quota_exhausted"
  | "authentication"
  | "authorization"
  | "invalid_model"
  | "timeout"
  | "unavailable"
  | "network"
  | "bad_request"
  | "unsupported_input";

export class AIProviderError extends AppError {
  readonly provider: AIProviderName;
  readonly code: AIProviderErrorCode;
  readonly retryable: boolean;
  readonly retryAfterMs?: number;
  attemptedProviders?: AIProviderName[];

  constructor(provider: AIProviderName, code: AIProviderErrorCode, message: string, statusCode: number, retryable = false, retryAfterMs?: number) {
    super(message, statusCode, true);
    this.provider = provider;
    this.code = code;
    this.retryable = retryable;
    this.retryAfterMs = retryAfterMs;
  }
}

interface ProviderErrorShape {
  status?: number;
  statusCode?: number;
  message?: string;
  code?: string;
  type?: string;
  retryAfterMs?: number;
  retry_after_ms?: number;
  error?: { message?: string; code?: string; type?: string };
}

export function classifyProviderError(provider: AIProviderName, error: unknown): AIProviderError {
  const shape = typeof error === "object" && error !== null ? error as ProviderErrorShape : undefined;
  const nested = shape?.error;
  const message = error instanceof Error ? error.message : nested?.message ?? shape?.message ?? String(error);
  const status = shape?.status ?? shape?.statusCode;
  const code = String(nested?.code ?? shape?.code ?? "").toLowerCase();
  const type = String(nested?.type ?? shape?.type ?? "").toLowerCase();
  const lower = message.toLowerCase();

  if (status === 408 || status === 504 || lower.includes("abort") || lower.includes("timeout") || lower.includes("timed out")) {
    return new AIProviderError(provider, "timeout", "The AI request timed out. Please try again.", 504, true);
  }

  // 429 can mean either a short-lived rate limit or a longer-lived quota
  // exhaustion. Treat quota exhaustion separately so the AI service can
  // immediately fail over to the other provider instead of retrying the
  // exhausted provider.
  if (
    code.includes("quota") ||
    code.includes("resource_exhausted") ||
    lower.includes("quota") ||
    lower.includes("resource_exhausted") ||
    lower.includes("requestsperday") ||
    lower.includes("request_per_day") ||
    lower.includes("daily limit") ||
    lower.includes("daily quota") ||
    lower.includes("quota exhausted")
  ) {
    return new AIProviderError(provider, "quota_exhausted", "The AI provider quota has been exhausted. Please try again later.", 429, false);
  }

  if (status === 429 || code.includes("rate") || type.includes("rate") || lower.includes("rate limit") || lower.includes("too many requests")) {
    const retryAfterMs = typeof shape?.retryAfterMs === "number"
      ? shape.retryAfterMs
      : typeof shape?.retry_after_ms === "number"
        ? shape.retry_after_ms
        : undefined;
    return new AIProviderError(provider, "rate_limit", "The AI provider is rate-limiting requests. Please try again shortly.", 429, true, retryAfterMs);
  }

  if (status === 401 || code.includes("auth") || lower.includes("api key") || lower.includes("unauthorized") || lower.includes("authentication")) {
    return new AIProviderError(provider, "authentication", "AI service authentication failed.", 502, false);
  }

  if (status === 403 || code.includes("forbidden") || lower.includes("forbidden") || lower.includes("permission denied")) {
    return new AIProviderError(provider, "authorization", "AI provider access was denied.", 502, false);
  }

  if (status === 404 || code.includes("model") || lower.includes("model not found") || lower.includes("invalid model")) {
    return new AIProviderError(provider, "invalid_model", "The configured AI model is unavailable.", 502, false);
  }

  if (code.includes("unsupported") || type.includes("unsupported") || lower.includes("unsupported input") || lower.includes("does not support image") || lower.includes("image input is not supported")) {
    return new AIProviderError(provider, "unsupported_input", "This AI provider does not support that input type.", 400, false);
  }

  if (status === 400 || code.includes("invalid") || lower.includes("bad request") || lower.includes("invalid request")) {
    return new AIProviderError(provider, "bad_request", "The AI request could not be processed.", 400, false);
  }

  if (lower.includes("fetch failed") || lower.includes("network") || lower.includes("econnreset") || lower.includes("enotfound")) {
    return new AIProviderError(provider, "network", "The AI provider could not be reached. Please try again.", 503, true);
  }

  if (typeof status === "number" && status >= 500) {
    return new AIProviderError(provider, "unavailable", "AI provider is temporarily unavailable. Please try again.", 503, true);
  }

  return new AIProviderError(provider, "unavailable", "AI provider is temporarily unavailable. Please try again.", 503, true);
}
