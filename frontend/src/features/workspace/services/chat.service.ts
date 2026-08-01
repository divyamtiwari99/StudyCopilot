import { api } from "@/lib/api";

export interface AskQuestionRequest {
  contentId: string;
  question: string;
}

export interface AskQuestionResponse {
  success: boolean;
  answer: string;
}

export async function askQuestion(
  payload: AskQuestionRequest
) {
  const { data } =
    await api.post<AskQuestionResponse>(
      "/chat/ask",
      payload
    );

  return data;
}