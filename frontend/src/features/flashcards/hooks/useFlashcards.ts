import { useQuery } from "@tanstack/react-query";

import { getFlashcards } from "../services/flashcards.service";

export function useFlashcards(
  contentId?: string,
) {
  return useQuery({
    queryKey: [
      "flashcards",
      contentId,
    ],

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