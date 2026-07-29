export interface Job<T = unknown> {
  id: string;
  name: string;
  payload: T;
  attempts: number;
}