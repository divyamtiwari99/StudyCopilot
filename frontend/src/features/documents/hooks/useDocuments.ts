import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import {
  getDocuments,
  type UploadedDocument,
} from "../../dashboard/services/document.service";

export function useDocuments() {
  return useQuery<UploadedDocument[]>({
    queryKey: queryKeys.documents(),

    queryFn: getDocuments,

    staleTime: 0,

    refetchInterval(query) {
      const documents =
        query.state.data;

      if (!documents) {
        return false;
      }

      const processing =
        documents.some(
          (doc) =>
            doc.status ===
              "processing" ||
            doc.status ===
              "uploading",
        );

      return processing
        ? 3000
        : false;
    },

    refetchOnWindowFocus: false,
  });
}