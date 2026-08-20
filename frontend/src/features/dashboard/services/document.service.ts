import { api } from "@/lib/api";
import { normalizeDocumentStatus, type DocumentStatus } from "@/features/documents/utils/documentStatus";

export interface ProcessingState {
  parser: boolean;

  normalized: boolean;

  embeddings: boolean;

  knowledgeGraph: boolean;

  roadmap: boolean;

  summary: boolean;

  flashcards: boolean;

  quiz: boolean;

  notes: boolean;

  studyPlanner: boolean;
}

export interface UploadedDocument {
  id: string;

  title: string;

  originalName: string;

  status:
    | "uploading"
    | "processing"
    | "ready"
    | "failed";

  size: number;

  pages?: number;

  mimeType: string;

  createdAt: string;

  processing?: ProcessingState;
}

interface ApiResponse<T> {
  success: boolean;

  data: T;
}

type ApiUploadedDocument = Omit<UploadedDocument, "status"> & {
  status: DocumentStatus | string;
};

function normalizeUploadedDocument(
  document: ApiUploadedDocument,
): UploadedDocument {
  return {
    ...document,
    status: normalizeDocumentStatus(document.status),
  };
}

export async function uploadDocument(
  file: File,
  onProgress?: (
    progress: number,
  ) => void,
) {
  const formData =
    new FormData();

  formData.append(
    "file",
    file,
  );

  formData.append(
    "title",
    file.name,
  );

  const response =
    await api.post<
      ApiResponse<ApiUploadedDocument>
    >(
      "/content/upload",
      formData,
      {
        onUploadProgress(
          event,
        ) {
          if (!event.total)
            return;

          onProgress?.(
            Math.round(
              (event.loaded *
                100) /
                event.total,
            ),
          );
        },
      },
    );

  return normalizeUploadedDocument(response.data.data);
}

export async function getDocuments() {
  const response =
    await api.get<ApiResponse<ApiUploadedDocument[]>>(
      "/content",
    );

  return response.data.data.map(normalizeUploadedDocument);
}

export async function getDocument(
  id: string,
) {
  const response =
    await api.get<
      ApiResponse<ApiUploadedDocument>
    >(`/content/${id}`);

  return normalizeUploadedDocument(response.data.data);
}

export async function renameDocument(
  id: string,
  title: string,
) {
  const response =
    await api.patch<
      ApiResponse<ApiUploadedDocument>
    >(`/content/${id}`, {
      title,
    });

  return normalizeUploadedDocument(response.data.data);
}

export async function deleteDocument(
  id: string,
) {
  await api.delete(
    `/content/${id}`,
  );
}