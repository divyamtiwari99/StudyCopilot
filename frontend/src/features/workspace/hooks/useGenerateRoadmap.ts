import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import {
  generateRoadmap,
  regenerateRoadmap,
} from "@/features/roadmap/services/roadmap.service";

interface GenerateRoadmapInput {
  contentId: string;

  regenerate?: boolean;
}

export function useGenerateRoadmap() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async ({
      contentId,
      regenerate = false,
    }: GenerateRoadmapInput) => {
      if (regenerate) {
        return regenerateRoadmap(
          contentId,
        );
      }

      return generateRoadmap(
        contentId,
      );
    },

    onSuccess: (
      _,
      variables,
    ) => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.roadmap(
            variables.contentId,
          ),
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