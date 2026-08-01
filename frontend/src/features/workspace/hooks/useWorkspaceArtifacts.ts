import { useMemo } from "react";

export function useWorkspaceArtifacts() {
  return useMemo(
    () => ({
      notes: false,
      summary: false,
      flashcards: false,
      quiz: false,
      knowledgeGraph: false,
    }),
    [],
  );
}