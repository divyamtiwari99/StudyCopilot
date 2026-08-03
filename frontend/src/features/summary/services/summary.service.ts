import { api } from "@/lib/api";

import type { ApiResponse } from "@/types/api";
import type { Artifact } from "@/types/artifact";

export type SummaryArtifact =
  Artifact;

export async function generateSummary(
  contentId: string,
) {
  const response =
    await api.post<
      ApiResponse<SummaryArtifact>
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
      ApiResponse<SummaryArtifact>
    >(
      `/ai/summary/${contentId}`,
    );

  return response.data.data;
}