import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { getStudyPlanner } from "../services/study-planner.service";

export function useStudyPlanner(
  contentId?: string,
) {
  return useQuery({
    queryKey: contentId
      ? queryKeys.studyPlanner(contentId)
      : queryKeys.studyPlannerRoot(),

    queryFn: () =>
      getStudyPlanner(contentId!),

    enabled: Boolean(contentId),

    staleTime:
      1000 * 60 * 5,

    gcTime:
      1000 * 60 * 10,

    refetchOnWindowFocus: false,
  });
}