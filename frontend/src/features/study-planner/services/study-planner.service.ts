import { api } from "@/lib/api";

import type { ApiResponse } from "@/types/api";

export interface StudyPlannerArtifact {
  _id: string;

  contentId: string;

  type: string;

  title: string;

  markdown: string;

  json?: unknown;

  createdAt: string;

  updatedAt: string;
}

export async function generateStudyPlanner(
  contentId: string,
) {
  const response =
    await api.post<
      ApiResponse<StudyPlannerArtifact>
    >(
      "/ai/study-planner/generate",
      {
        contentId,
      },
    );

  return response.data.data;
}

export async function regenerateStudyPlanner(
  contentId: string,
) {
  const response =
    await api.post<
      ApiResponse<StudyPlannerArtifact>
    >(
      "/ai/study-planner/regenerate",
      {
        contentId,
      },
    );

  return response.data.data;
}

export async function getStudyPlanner(
  contentId: string,
) {
  const response =
    await api.get<
      ApiResponse<StudyPlannerArtifact>
    >(
      `/ai/study-planner/${contentId}`,
    );

  return response.data.data;
}