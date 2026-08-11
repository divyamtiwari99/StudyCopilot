import {
  useQuery,
} from "@tanstack/react-query";


import {
  getAllFlashcards,
} from "../services/flashcards.service";



export function useAllFlashcards() {


  return useQuery({


    queryKey: [
      "flashcards",
      "all",
    ],



    queryFn:
      getAllFlashcards,



    staleTime:
      1000 * 60 * 5,



    gcTime:
      1000 * 60 * 10,



    retry: 1,



    refetchOnWindowFocus:
      false,


  });


}