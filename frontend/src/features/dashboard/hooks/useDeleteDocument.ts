import { queryKeys } from "@/lib/queryKeys";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { deleteDocument } from "../services/document.service";

export function useDeleteDocument() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: deleteDocument,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: queryKeys.documents(),
      });

      toast.success(
        "Document deleted successfully.",
      );
    },

    onError(error) {
      console.error(error);

      toast.error(
        "Failed to delete document.",
      );
    },
  });
}