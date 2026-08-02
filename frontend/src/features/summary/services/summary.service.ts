import { api } from "@/lib/api";

interface ArtifactResponse {
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

export async function generateSummary(
  contentId: string,
) {
  const response =
    await api.post<
      ApiResponse<ArtifactResponse>
    >(
      "/ai/summary/generate",
      {
        contentId,
      },
    );

  return response.data.data;
}

export async function getSummary(
  contentId: string,
) {
  const response =
    await api.get<
      ApiResponse<ArtifactResponse>
    >(
      `/ai/summary/${contentId}`,
    );

  return response.data.data;
}