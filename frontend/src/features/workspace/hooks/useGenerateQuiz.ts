import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { generateQuiz } from "../services/ai.service";

export function useGenerateQuiz() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: generateQuiz,

    onSuccess: (_, contentId) => {
      queryClient.invalidateQueries({
        queryKey: [
          "quiz",
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