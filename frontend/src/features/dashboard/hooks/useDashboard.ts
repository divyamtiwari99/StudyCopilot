import { useMemo } from "react";

import { useDocuments } from "../../documents/hooks/useDocuments";

export interface DashboardStats {
  totalDocuments: number;
  readyDocuments: number;
  processingDocuments: number;
  failedDocuments: number;
  totalStorageBytes: number;
  totalStorageLabel: string;
}

function formatBytes(bytes: number) {
  if (bytes === 0) {
    return "0 MB";
  }

  const mb = bytes / 1024 / 1024;

  if (mb < 1024) {
    return `${mb.toFixed(1)} MB`;
  }

  return `${(mb / 1024).toFixed(2)} GB`;
}

export function useDashboard() {
  const {
    data: documents = [],
    isLoading,
    isFetching,
    refetch,
  } = useDocuments();

  const dashboard = useMemo(() => {
    const totalDocuments = documents.length;

    const readyDocuments = documents.filter(
      (doc) => doc.status === "ready",
    );

    const processingDocuments = documents.filter(
      (doc) =>
        doc.status === "processing" ||
        doc.status === "uploading",
    );

    const failedDocuments = documents.filter(
      (doc) => doc.status === "failed",
    );

    const totalStorageBytes = documents.reduce(
      (sum, doc) => sum + doc.size,
      0,
    );

    const recentDocuments = [...documents]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime(),
      )
      .slice(0, 5);

    return {
      stats: {
        totalDocuments,

        readyDocuments:
          readyDocuments.length,

        processingDocuments:
          processingDocuments.length,

        failedDocuments:
          failedDocuments.length,

        totalStorageBytes,

        totalStorageLabel:
          formatBytes(
            totalStorageBytes,
          ),
      },

      recentDocuments,

      documents,
    };
  }, [documents]);

  return {
    ...dashboard,

    isLoading,

    isFetching,

    refetch,
  };
}