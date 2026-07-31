import { useQuery } from "@tanstack/react-query";

import {
  getDocuments,
  type UploadedDocument,
} from "../../dashboard/services/document.service";

export function useDocuments() {
  return useQuery<UploadedDocument[]>({
    queryKey: ["documents"],

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

    retry: 1,

    refetchOnWindowFocus: false,
  });
}