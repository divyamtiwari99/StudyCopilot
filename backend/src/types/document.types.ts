export type DocumentStatus =
  | "uploading"
  | "processing"
  | "embedding"
  | "ready"
  | "failed";

export interface DocumentMetadata {
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  pages: number;
}

export interface AIProcessing {
  summaryGenerated: boolean;
  embeddingsGenerated: boolean;
  flashcardsGenerated: boolean;
  quizGenerated: boolean;
  notesGenerated: boolean;
}

export interface DocumentResponse {
  _id: string;

  title: string;

  status: DocumentStatus;

  metadata: DocumentMetadata;

  ai: AIProcessing;

  createdAt: Date;

  updatedAt: Date;
}