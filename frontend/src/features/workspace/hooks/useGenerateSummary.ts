import { queryKeys } from "@/lib/queryKeys";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { generateSummary } from "../services/ai.service";

export function useGenerateSummary() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: generateSummary,

    onSuccess: (_, contentId) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.summary(contentId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.document(contentId),
      });
    },
  });
}