import { useQuery } from "@tanstack/react-query";

import { getSummary } from "../services/summary.service";

export function useSummary(
  contentId?: string,
) {
  return useQuery({
    queryKey: [
      "summary",
      contentId,
    ],

    queryFn: () =>
      getSummary(
        contentId!,
      ),

    enabled:
      !!contentId,

    staleTime:
      1000 * 60 * 5,
  });
}