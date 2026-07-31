import { api } from "@/lib/api";

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
}

export async function uploadDocument(
  file: File,
  onProgress?: (progress: number) => void,
) {
  const formData = new FormData();

  // Upload file
  formData.append("file", file);

  // Backend Zod validation ke liye required
  formData.append("title", file.name);

  const { data } = await api.post(
    "/content/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },

      onUploadProgress(event) {
        if (!event.total) return;

        onProgress?.(
          Math.round(
            (event.loaded * 100) / event.total,
          ),
        );
      },
    },
  );

  return data;
}

export async function getDocuments() {
  const { data } =
    await api.get<UploadedDocument[]>(
      "/content",
    );

  return data;
}

export async function deleteDocument(
  id: string,
) {
  await api.delete(`/content/${id}`);
}