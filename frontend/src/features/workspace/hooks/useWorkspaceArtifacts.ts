import { useParams } from "react-router-dom";

import { useDocument } from "@/features/dashboard/hooks/useDocument";

export function useWorkspaceArtifacts() {
  const { contentId } =
    useParams();

  const { data } =
    useDocument(contentId);

  return {
    notes:
      data?.processing?.notes ??
      false,

    summary:
      data?.processing?.summary ??
      false,

    flashcards:
      data?.processing
        ?.flashcards ?? false,

    quiz:
      data?.processing?.quiz ??
      false,

    knowledgeGraph:
      data?.processing
        ?.knowledgeGraph ??
      false,
  };
}