export type ProcessingStage =
  | "uploaded"
  | "parsing"
  | "normalizing"
  | "chunking"
  | "knowledge"
  | "embedding"
  | "summarizing"
  | "flashcards"
  | "quiz"
  | "notes"
  | "completed"
  | "failed";

export interface ProcessingJob {
  contentId: string;

  filePath: string;

  mimeType: string;

  stage: ProcessingStage;
}