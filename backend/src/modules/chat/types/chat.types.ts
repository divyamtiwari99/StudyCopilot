export type AIMode =
  | "study"
  | "assistant"
  | "hybrid";

export type ResponseLength =
  | "short"
  | "balanced"
  | "detailed";

export interface ChatRequest {
  sessionId?: string;
  contentId?: string;
  documentIds?: string[];
  question: string;
  mode?: AIMode;
  responseLength?: ResponseLength;
  citations?: boolean;
  deepReasoning?: boolean;
  requestId?: string;
}

export interface RetrievedChunk {
  chunkId: string;
  contentId: string;
  text: string;
  title: string;
  order: number;
  score: number;
}

export interface ChatAttachment {
  type: "image" | "document";
  name: string;
  mimeType: string;
  storageKey?: string;
  contentId?: string;
  status?: "uploading" | "processing" | "ready" | "failed";
  url?: string;
}
