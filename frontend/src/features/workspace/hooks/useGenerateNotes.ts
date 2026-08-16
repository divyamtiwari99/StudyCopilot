import { queryKeys } from "@/lib/queryKeys";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { generateNotes } from "../services/ai.service";

export function useGenerateNotes() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: generateNotes,

    onSuccess: (_, contentId) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.document(contentId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.notes(contentId),
      });
    },
  });
}