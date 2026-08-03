import { api } from "@/lib/api";

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

  mimeType: string;

  createdAt: string;

  processing?: ProcessingState;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
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
      ApiResponse<UploadedDocument>
    >(
      "/content/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },

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

  return response.data.data;
}

export async function getDocuments() {
  const response =
    await api.get<
      ApiResponse<
        UploadedDocument[]
      >
    >("/content");

  return response.data.data;
}

export async function getDocument(
  id: string,
) {
  const response =
    await api.get<
      ApiResponse<UploadedDocument>
    >(`/content/${id}`);

  return response.data.data;
}

export async function deleteDocument(
  id: string,
) {
  await api.delete(
    `/content/${id}`,
  );
}