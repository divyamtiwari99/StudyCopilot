import { useQuery } from "@tanstack/react-query";

import {
  getDocument,
  type UploadedDocument,
} from "../services/document.service";

export function useDocument(
  contentId?: string,
) {
  return useQuery<UploadedDocument>({
    queryKey: [
      "document",
      contentId,
    ],

    queryFn: () =>
      getDocument(
        contentId!,
      ),

    enabled:
      !!contentId,

    staleTime: 1000 * 60 * 5,

    retry: 1,

    refetchOnWindowFocus: false,
  });
}