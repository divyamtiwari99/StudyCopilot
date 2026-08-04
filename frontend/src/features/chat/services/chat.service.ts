import { api } from "@/lib/api";

import type {
  AskQuestionRequest,
  AskQuestionResponse,
} from "../types/chat.types";

export async function askQuestion(
  payload: AskQuestionRequest,
): Promise<AskQuestionResponse> {
  const { data } =
    await api.post(
      "/chat/ask",
      payload,
    );

  return data;
}