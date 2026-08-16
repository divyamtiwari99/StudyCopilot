import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;

          if (status !== undefined && status >= 400 && status < 500) {
            return false;
          }
        }

        return failureCount < 1;
      },
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Never retry mutations automatically. A successful server-side
      // operation with a lost response can otherwise be duplicated.
      retry: 0,
    },
  },
});
