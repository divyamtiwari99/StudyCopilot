import { api } from "@/lib/api";

export interface AskQuestionPayload {
  contentId: string;
  question: string;
}

export interface AskQuestionResponse {
  success: boolean;

  answer: string;
}

export async function askQuestion(
  payload: AskQuestionPayload
) {
  const { data } =
    await api.post<AskQuestionResponse>(
      "/chat/ask",
      payload
    );

  return data;
}