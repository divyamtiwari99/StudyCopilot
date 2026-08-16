import { queryKeys } from "@/lib/queryKeys";

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
        queryKey: queryKeys.flashcards(contentId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.document(contentId),
      });
    },
  });
}