import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { getQuiz } from "../services/quiz.service";

export function useQuiz(
  contentId?: string,
) {
  return useQuery({
    queryKey: contentId ? queryKeys.quiz(contentId) : queryKeys.quizRoot(),

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