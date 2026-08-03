import { api } from "@/lib/api";

import type { ApiResponse } from "@/types/api";

export interface RoadmapArtifact {
  _id: string;

  contentId: string;

  type: string;

  title: string;

  markdown: string;

  json?: unknown;

  createdAt: string;

  updatedAt: string;
}

export async function generateRoadmap(
  contentId: string,
) {
  const response =
    await api.post<
      ApiResponse<RoadmapArtifact>
    >(
      "/ai/roadmap/generate",
      {
        contentId,
      },
    );

  return response.data.data;
}

export async function regenerateRoadmap(
  contentId: string,
) {
  const response =
    await api.post<
      ApiResponse<RoadmapArtifact>
    >(
      "/ai/roadmap/regenerate",
      {
        contentId,
      },
    );

  return response.data.data;
}

export async function getRoadmap(
  contentId: string,
) {
  const response =
    await api.get<
      ApiResponse<RoadmapArtifact>
    >(
      `/ai/roadmap/${contentId}`,
    );

  return response.data.data;
}