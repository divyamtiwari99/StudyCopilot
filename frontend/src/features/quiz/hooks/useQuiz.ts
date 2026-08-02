import { useQuery } from "@tanstack/react-query";

import { getQuiz } from "../services/quiz.service";

export function useQuiz(
  contentId?: string,
) {
  return useQuery({
    queryKey: [
      "quiz",
      contentId,
    ],

    queryFn: () =>
      getQuiz(
        contentId!,
      ),

    enabled:
      !!contentId,

    staleTime:
      1000 * 60 * 5,
  });
}