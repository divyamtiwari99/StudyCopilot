export interface ChatRequest {
  contentId: string;

  question: string;
}

export interface RetrievedChunk {
  chunkId: string;

  text: string;

  score: number;
}