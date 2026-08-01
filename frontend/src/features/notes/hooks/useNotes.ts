import { useQuery } from "@tanstack/react-query";

import {
  getNotes,
  type NotesArtifact,
} from "../services/notes.service";

export function useNotes(
  contentId?: string,
) {
  return useQuery<NotesArtifact>({
    queryKey: [
      "notes",
      contentId,
    ],

    queryFn: () =>
      getNotes(
        contentId!,
      ),

    enabled:
      !!contentId,

    staleTime:
      1000 * 60 * 5,

    retry: 1,
  });
}