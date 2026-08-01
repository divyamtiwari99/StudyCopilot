export type ArtifactType =
  | "notes"
  | "summary"
  | "flashcards"
  | "quiz"
  | "knowledgeGraph";

export type ArtifactStatus =
  | "idle"
  | "generating"
  | "completed"
  | "failed";

export interface WorkspaceArtifact {
  type: ArtifactType;

  status: ArtifactStatus;

  title: string;

  exists: boolean;
}