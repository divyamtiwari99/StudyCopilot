import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import {
  getNotes,
  getAllNotes,
} from "../services/notes.service";



export function useNotes(
  contentId?: string,
) {

  return useQuery({

    queryKey: contentId
      ? queryKeys.notes(contentId)
      : ["notes"],


    queryFn: () =>
      getNotes(contentId!),


    enabled: Boolean(contentId),


    staleTime:
      1000 * 60 * 5,


    gcTime:
      1000 * 60 * 10,


    retry: 1,


    refetchOnWindowFocus:
      false,

  });

}





// ==========================
// Sidebar Notes
// ==========================

export function useAllNotes() {

  return useQuery({

    queryKey: [
      "all-notes",
    ],


    queryFn:
      getAllNotes,


    staleTime:
      1000 * 60 * 5,


    gcTime:
      1000 * 60 * 10,


    retry: 1,


    refetchOnWindowFocus:
      false,

  });

}