export type DocumentStatus =
  | "uploading"
  | "processing"
  | "ready"
  | "completed"
  | "failed";

/**
 * The frontend uses `ready` as its canonical status.
 * The source already supports both `ready` and `completed`,
 * so accepting both here keeps the UI stable without assuming
 * which backend representation is returned in every environment.
 */
export function normalizeDocumentStatus(
  status: DocumentStatus | string,
): Exclude<DocumentStatus, "completed"> {
  return status === "completed" ? "ready" : (status as Exclude<DocumentStatus, "completed">);
}

export function isDocumentReady(
  status: DocumentStatus | string,
): boolean {
  return normalizeDocumentStatus(status) === "ready";
}
