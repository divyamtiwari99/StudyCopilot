import { useMutation } from "@tanstack/react-query";

import {
  askQuestion,
  type AskQuestionRequest,
} from "../services/chat.service";

export function useChat() {
  return useMutation({
    mutationFn: (
      payload: AskQuestionRequest
    ) => askQuestion(payload),
  });
}