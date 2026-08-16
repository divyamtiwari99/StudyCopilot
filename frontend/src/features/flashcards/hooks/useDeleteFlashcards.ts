import { queryKeys } from "@/lib/queryKeys";

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

        queryKey: queryKeys.flashcards(contentId),

      });




      queryClient.invalidateQueries({

        queryKey: queryKeys.allFlashcards(),

      });



    },


  });


}