import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { getRoadmap } from "../services/roadmap.service";

export function useRoadmap(
  contentId?: string,
) {
  return useQuery({
    queryKey: contentId
      ? queryKeys.roadmap(contentId)
      : queryKeys.roadmapRoot(),

    queryFn: () =>
      getRoadmap(contentId!),

    enabled: Boolean(contentId),

    staleTime:
      1000 * 60 * 5,

    gcTime:
      1000 * 60 * 10,

    refetchOnWindowFocus: false,
  });
}