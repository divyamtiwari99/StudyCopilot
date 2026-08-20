export type DocumentStatus =
  | "uploading"
  | "processing"
  | "ready"
  | "completed"
  | "parsing"
  | "normalizing"
  | "chunking"
  | "embedding"
  | "knowledge"
  | "failed";

export function normalizeDocumentStatus(
  status: DocumentStatus | string,
): Exclude<DocumentStatus, "completed" | "parsing" | "normalizing" | "chunking" | "embedding" | "knowledge"> {
  if (status === "completed") return "ready";
  if (["parsing", "normalizing", "chunking", "embedding", "knowledge"].includes(status)) {
    return "processing";
  }
  if (status === "uploading" || status === "processing" || status === "ready" || status === "failed") {
    return status as "uploading" | "processing" | "ready" | "failed";
  }
  return "processing";
}

export function isDocumentReady(status: DocumentStatus | string): boolean {
  return normalizeDocumentStatus(status) === "ready";
}
