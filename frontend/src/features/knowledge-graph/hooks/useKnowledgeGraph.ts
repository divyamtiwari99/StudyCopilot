import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { getKnowledgeGraph } from "../services/knowledge-graph.service";

export function useKnowledgeGraph(
  contentId?: string,
) {
  return useQuery({
    queryKey: contentId
      ? queryKeys.knowledgeGraph(contentId)
      : queryKeys.knowledgeGraphRoot(),

    queryFn: () =>
      getKnowledgeGraph(contentId!),

    enabled: Boolean(contentId),

    staleTime:
      1000 * 60 * 5,

    gcTime:
      1000 * 60 * 10,

    refetchOnWindowFocus: false,
  });
}