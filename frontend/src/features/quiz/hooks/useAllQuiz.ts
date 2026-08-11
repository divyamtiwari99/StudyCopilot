import { useQuery } from "@tanstack/react-query";

import {
  getAllQuiz,
} from "../services/quiz.service";


export function useAllQuiz() {

  return useQuery({

    queryKey: [
      "quiz",
      "all",
    ],


    queryFn:
      getAllQuiz,


    staleTime:
      1000 * 60 * 5,


    gcTime:
      1000 * 60 * 10,


    retry: 1,


    refetchOnWindowFocus:
      false,

  });

}