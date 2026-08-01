import { useMutation } from "@tanstack/react-query";

import { generateNotes } from "../services/ai.service";

export function useGenerateNotes() {
  return useMutation({
    mutationFn: generateNotes,
  });
}