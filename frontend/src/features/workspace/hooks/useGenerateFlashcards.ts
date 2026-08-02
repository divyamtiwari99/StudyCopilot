import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { generateFlashcards } from "@/features/flashcards/services/flashcards.service";

export function useGenerateFlashcards() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      generateFlashcards,

    onSuccess: (
      _,
      contentId,
    ) => {
      queryClient.invalidateQueries({
        queryKey: [
          "flashcards",
          contentId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "document",
          contentId,
        ],
      });
    },
  });
}