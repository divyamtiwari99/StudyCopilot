import { queryKeys } from "@/lib/queryKeys";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";


import { deleteNotes } from "../services/notes.service";



export function useDeleteNotes() {

  const queryClient =
    useQueryClient();



  return useMutation({

    mutationFn:
      deleteNotes,


    onSuccess: (_, contentId) => {


      // Remove single document notes cache

      queryClient.invalidateQueries({

        queryKey: queryKeys.notes(contentId),

      });



      // Refresh notes library

      queryClient.invalidateQueries({

        queryKey: queryKeys.allNotes(),

      });



    },

  });


}