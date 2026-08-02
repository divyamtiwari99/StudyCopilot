import { useMutation } from "@tanstack/react-query";

import { generateQuiz } from "../services/ai.service";

export function useGenerateQuiz() {
  return useMutation({
    mutationFn: generateQuiz,
  });
}