import { useMutation } from "@tanstack/react-query";

import { generateSummary } from "../services/ai.service";

export function useGenerateSummary() {
  return useMutation({
    mutationFn: generateSummary,
  });
}