import { api } from "@/lib/api";

import type { Flashcard } from "../types/flashcard.types";

interface ArtifactResponse {
  _id: string;

  contentId: string;

  title: string;

  json: Flashcard[];

  createdAt: string;

  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;

  data: T;
}

export async function generateFlashcards(
  contentId: string,
) {
  const response =
    await api.post<
      ApiResponse<ArtifactResponse>
    >(
      "/ai/flashcards/generate",
      {
        contentId,
      },
    );

  return response.data.data;
}

export async function getFlashcards(
  contentId: string,
) {
  const response =
    await api.get<
      ApiResponse<ArtifactResponse>
    >(
      `/ai/flashcards/${contentId}`,
    );

  return response.data.data;
}

export async function getAllFlashcards() {

  const response =
    await api.get<
      ApiResponse<ArtifactResponse[]>
    >(
      "/ai/flashcards",
    );


  return response.data.data;

}



export async function deleteFlashcards(
  contentId: string,
) {

  const response =
    await api.delete<
      ApiResponse<null>
    >(
      `/ai/flashcards/${contentId}`,
    );


  return response.data;

}