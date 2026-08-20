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
  | "studyPlanner"
  | "completed"
  | "failed";

export interface ProcessingJob {
  userId: string;
  contentId: string;
  storageKey: string;
  mimeType: string;
  stage: ProcessingStage;
}
