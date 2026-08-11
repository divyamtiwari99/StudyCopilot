import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";


import {
  deleteQuiz,
} from "../services/quiz.service";



export function useDeleteQuiz() {


  const queryClient =
    useQueryClient();



  return useMutation({


    mutationFn:
      deleteQuiz,



    onSuccess: (_, contentId) => {



      // Refresh single quiz cache

      queryClient.invalidateQueries({

        queryKey: [
          "quiz",
          contentId,
        ],

      });




      // Refresh quiz library

      queryClient.invalidateQueries({

        queryKey: [
          "quiz",
          "all",
        ],

      });


    },


  });


}