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
      Boolean(contentId),

    staleTime:
      1000 * 60,

    gcTime:
      1000 * 60 * 10,

    retry: 1,

    refetchOnMount: true,

    refetchOnReconnect: true,

    refetchOnWindowFocus: false,
  });
}