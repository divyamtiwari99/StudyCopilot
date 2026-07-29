export type ProcessingStage =
  | "uploaded"
  | "parsing"
  | "normalizing"
  | "chunking"
  | "knowledge"
  | "embedding"
  | "completed"
  | "failed";

export interface ProcessingJob {

  contentId: string;

  filePath: string;

  mimeType: string;

  stage: ProcessingStage;

}