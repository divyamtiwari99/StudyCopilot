import { api } from "@/lib/api";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface AIArtifact {
  _id: string;

  contentId: string;

  type: string;

  title: string;

  markdown: string;

  createdAt: string;

  updatedAt: string;
}

export async function generateNotes(
  contentId: string,
) {
  const response =
    await api.post<
      ApiResponse<AIArtifact>
    >("/ai/notes/generate", {
      contentId,
    });

  return response.data.data;
}

export async function getNotes(
  contentId: string,
) {
  const response =
    await api.get<
      ApiResponse<AIArtifact>
    >(`/ai/notes/${contentId}`);

  return response.data.data;
}