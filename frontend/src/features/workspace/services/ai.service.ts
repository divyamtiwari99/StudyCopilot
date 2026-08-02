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

  json?: unknown;

  createdAt: string;

  updatedAt: string;
}

// ==================== NOTES ====================

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

// ================= FLASHCARDS =================

export async function generateFlashcards(
  contentId: string,
) {
  const response =
    await api.post<
      ApiResponse<AIArtifact>
    >("/ai/flashcards/generate", {
      contentId,
    });

  return response.data.data;
}

export async function getFlashcards(
  contentId: string,
) {
  const response =
    await api.get<
      ApiResponse<AIArtifact>
    >(`/ai/flashcards/${contentId}`);

  return response.data.data;
}

// ==================== QUIZ ====================

export async function generateQuiz(
  contentId: string,
) {
  const response =
    await api.post<
      ApiResponse<AIArtifact>
    >("/ai/quiz/generate", {
      contentId,
    });

  return response.data.data;
}

export async function getQuiz(
  contentId: string,
) {
  const response =
    await api.get<
      ApiResponse<AIArtifact>
    >(`/ai/quiz/${contentId}`);

  return response.data.data;
}

// ================== SUMMARY ===================

export async function generateSummary(
  contentId: string,
) {
  const response =
    await api.post<
      ApiResponse<AIArtifact>
    >("/ai/summary/generate", {
      contentId,
    });

  return response.data.data;
}

export async function getSummary(
  contentId: string,
) {
  const response =
    await api.get<
      ApiResponse<AIArtifact>
    >(`/ai/summary/${contentId}`);

  return response.data.data;
}