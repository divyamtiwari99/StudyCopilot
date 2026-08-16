import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import {
  getAllQuiz,
} from "../services/quiz.service";


export function useAllQuiz() {

  return useQuery({

    queryKey: queryKeys.allQuiz(),


    queryFn:
      getAllQuiz,


    staleTime:
      1000 * 60 * 5,


    gcTime:
      1000 * 60 * 10,


    refetchOnWindowFocus:
      false,

  });

}