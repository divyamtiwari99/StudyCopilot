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
        queryKey: [
          "summary",
          contentId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "document",
          contentId,
        ],
      });
    },
  });
}