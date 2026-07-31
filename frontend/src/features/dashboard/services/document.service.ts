import { api } from "../../../lib/api";

export async function uploadDocument(
  file: File,
  onProgress?: (progress: number) => void,
) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/documents/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },

      onUploadProgress(event) {
        if (!event.total) {
          return;
        }

        const progress = Math.round(
          (event.loaded * 100) / event.total,
        );

        onProgress?.(progress);
      },
    },
  );

  return response.data;
}