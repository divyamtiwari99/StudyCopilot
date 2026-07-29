export type ContentKind =
  | "pdf"
  | "docx"
  | "pptx"
  | "xlsx"
  | "txt"
  | "markdown"
  | "image"
  | "audio"
  | "video"
  | "url"
  | "zip";

export type ContentStatus =
  | "uploading"
  | "stored"
  | "detecting"
  | "parsing"
  | "normalizing"
  | "embedding"
  | "completed"
  | "failed";

export interface StorageInfo {
  originalName: string;
  storedName: string;
  mimeType: string;
  extension: string;
  size: number;
  path: string;
}

export interface ProcessingState {
  parser: boolean;
  normalized: boolean;
  embeddings: boolean;
  knowledgeGraph: boolean;
  summary: boolean;
  flashcards: boolean;
  quiz: boolean;
  notes: boolean;
}

export interface ContentDocument {
  title: string;
  kind: ContentKind;
  status: ContentStatus;
  storage: StorageInfo;
  processing: ProcessingState;
}