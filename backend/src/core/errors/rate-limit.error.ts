import { AppError } from "./app.error.js";

export class RateLimitError extends AppError {
  public readonly code: "app_rate_limit" | "app_concurrency_limit";
  public readonly retryAfterMs?: number;

  constructor(
    message: string,
    code: "app_rate_limit" | "app_concurrency_limit" = "app_rate_limit",
    retryAfterMs?: number,
  ) {
    super(message, 429);
    this.code = code;
    this.retryAfterMs = retryAfterMs;
  }
}
