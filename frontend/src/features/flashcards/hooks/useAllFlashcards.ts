import { queryKeys } from "@/lib/queryKeys";

import {
  useQuery,
} from "@tanstack/react-query";


import {
  getAllFlashcards,
} from "../services/flashcards.service";



export function useAllFlashcards() {


  return useQuery({


    queryKey: queryKeys.allFlashcards(),



    queryFn:
      getAllFlashcards,



    staleTime:
      1000 * 60 * 5,



    gcTime:
      1000 * 60 * 10,



    refetchOnWindowFocus:
      false,


  });


}