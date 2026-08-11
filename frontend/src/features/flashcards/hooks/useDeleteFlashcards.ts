import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";


import {
  deleteFlashcards,
} from "../services/flashcards.service";



export function useDeleteFlashcards() {


  const queryClient =
    useQueryClient();



  return useMutation({


    mutationFn:
      deleteFlashcards,



    onSuccess: (_, contentId) => {



      queryClient.invalidateQueries({

        queryKey: [
          "flashcards",
          contentId,
        ],

      });




      queryClient.invalidateQueries({

        queryKey: [
          "flashcards",
          "all",
        ],

      });



    },


  });


}