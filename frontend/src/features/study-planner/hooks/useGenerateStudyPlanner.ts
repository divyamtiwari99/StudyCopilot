import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import {
  generateStudyPlanner,
  regenerateStudyPlanner,
} from "../services/study-planner.service";

interface GenerateStudyPlannerInput {
  contentId: string;

  regenerate?: boolean;
}

export function useGenerateStudyPlanner() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async ({
      contentId,
      regenerate = false,
    }: GenerateStudyPlannerInput) => {
      if (regenerate) {
        return regenerateStudyPlanner(
          contentId,
        );
      }

      return generateStudyPlanner(
        contentId,
      );
    },

    onSuccess: (
      _,
      variables,
    ) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.studyPlanner(variables.contentId),
      });

      queryClient.invalidateQueries({
        queryKey:
          queryKeys.document(
            variables.contentId,
          ),
      });
    },
  });
}