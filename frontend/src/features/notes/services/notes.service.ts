import { api } from "@/lib/api";

export interface NotesArtifact {
  _id: string;

  title: string;

  markdown: string;

  createdAt: string;

  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;

  data: T;
}

export async function getNotes(
  contentId: string,
) {
  const response =
    await api.get<
      ApiResponse<NotesArtifact>
    >(
      `/ai/notes/${contentId}`,
    );

  return response.data.data;
}