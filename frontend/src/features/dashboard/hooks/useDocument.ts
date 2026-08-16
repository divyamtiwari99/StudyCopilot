import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import {
  getDocument,
  type UploadedDocument,
} from "../services/document.service";

export function useDocument(
  contentId?: string,
) {
  return useQuery<UploadedDocument>({
    queryKey: contentId
      ? queryKeys.document(contentId)
      : queryKeys.documentRoot(),

    queryFn: () =>
      getDocument(contentId!),

    enabled: Boolean(contentId),

    staleTime: 1000 * 60,

    gcTime: 1000 * 60 * 10,

    refetchOnMount: true,

    refetchOnReconnect: true,

    refetchOnWindowFocus: false,
  });
}