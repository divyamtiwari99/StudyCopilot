export interface ChatSource {
  chunkId: string;

  title: string;

  order: number;
}

export interface ChatResponse {
  answer: string;

  sources: ChatSource[];
}