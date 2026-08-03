import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import {
  generateKnowledgeGraph,
  regenerateKnowledgeGraph,
} from "@/features/knowledge-graph/services/knowledge-graph.service";

interface GenerateKnowledgeGraphInput {
  contentId: string;

  regenerate?: boolean;
}

export function useGenerateKnowledgeGraph() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async ({
      contentId,
      regenerate = false,
    }: GenerateKnowledgeGraphInput) => {
      if (regenerate) {
        return regenerateKnowledgeGraph(
          contentId,
        );
      }

      return generateKnowledgeGraph(
        contentId,
      );
    },

    onSuccess: (
      _,
      variables,
    ) => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.knowledgeGraph(
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