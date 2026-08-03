import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import {
  getSummary,
  type SummaryArtifact,
} from "../services/summary.service";

export function useSummary(
  contentId?: string,
) {
  return useQuery<SummaryArtifact>({
    queryKey: contentId
      ? queryKeys.summary(contentId)
      : ["summary"],

    queryFn: () =>
      getSummary(contentId!),

    enabled: Boolean(contentId),

    staleTime:
      1000 * 60 * 5,

    gcTime:
      1000 * 60 * 10,

    retry: 1,

    refetchOnWindowFocus: false,
  });
}