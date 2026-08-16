import { queryKeys } from "@/lib/queryKeys";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { renameDocument } from "../services/document.service";

interface RenameInput {
  id: string;

  title: string;
}

export function useRenameDocument() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      title,
    }: RenameInput) =>
      renameDocument(
        id,
        title,
      ),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: queryKeys.documents(),
      });

      toast.success(
        "Document renamed successfully.",
      );
    },

    onError(error) {
      console.error(error);

      toast.error(
        "Failed to rename document.",
      );
    },
  });
}