export interface Job<T = unknown> {
  id: string;
  name: string;
  payload: T;
  attempts: number;
}

export interface QueueDispatchOptions {
  maxAttempts?: number;
  dedupeKey?: string;
  delayMs?: number;
}
