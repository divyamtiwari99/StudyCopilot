import { useQuery } from "@tanstack/react-query";


import {
  getAllNotes,
} from "../services/notes.service";



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