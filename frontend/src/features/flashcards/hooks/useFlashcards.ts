import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { getFlashcards } from "../services/flashcards.service";

export function useFlashcards(
  contentId?: string,
) {
  return useQuery({
    queryKey: contentId ? queryKeys.flashcards(contentId) : queryKeys.flashcardsRoot(),

    queryFn: () =>
      getFlashcards(
        contentId!,
      ),

    enabled:
      !!contentId,

    staleTime:
      1000 * 60 * 5,
  });
}