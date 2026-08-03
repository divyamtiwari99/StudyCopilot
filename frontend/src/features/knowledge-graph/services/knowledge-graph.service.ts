import { api } from "@/lib/api";

import type { ApiResponse } from "@/types/api";

export interface KnowledgeGraphArtifact {
  _id: string;

  contentId: string;

  type: string;

  title: string;

  markdown: string;

  json?: unknown;

  createdAt: string;

  updatedAt: string;
}

export async function generateKnowledgeGraph(
  contentId: string,
) {
  const response =
    await api.post<
      ApiResponse<KnowledgeGraphArtifact>
    >(
      "/ai/knowledge-graph/generate",
      {
        contentId,
      },
    );

  return response.data.data;
}

export async function regenerateKnowledgeGraph(
  contentId: string,
) {
  const response =
    await api.post<
      ApiResponse<KnowledgeGraphArtifact>
    >(
      "/ai/knowledge-graph/regenerate",
      {
        contentId,
      },
    );

  return response.data.data;
}

export async function getKnowledgeGraph(
  contentId: string,
) {
  const response =
    await api.get<
      ApiResponse<KnowledgeGraphArtifact>
    >(
      `/ai/knowledge-graph/${contentId}`,
    );

  return response.data.data;
}