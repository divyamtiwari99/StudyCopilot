import { api } from "@/lib/api";

import type {
  QuizQuestion,
} from "../types/quiz.types";

interface ArtifactResponse {
  _id: string;

  contentId: string;

  title: string;

  json: QuizQuestion[];

  createdAt: string;

  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;

  data: T;
}

export async function generateQuiz(
  contentId: string,
) {
  const response =
    await api.post<
      ApiResponse<ArtifactResponse>
    >(
      "/ai/quiz/generate",
      {
        contentId,
      },
    );

  return response.data.data;
}

export async function getQuiz(
  contentId: string,
) {
  const response =
    await api.get<
      ApiResponse<ArtifactResponse>
    >(
      `/ai/quiz/${contentId}`,
    );

  return response.data.data;
}

export async function getAllQuiz() {

  const response =
    await api.get<
      ApiResponse<ArtifactResponse[]>
    >(
      "/ai/quiz",
    );


  return response.data.data;

}

export async function deleteQuiz(
  contentId: string,
) {

  const response =
    await api.delete<
      ApiResponse<null>
    >(
      `/ai/quiz/${contentId}`,
    );


  return response.data;

}