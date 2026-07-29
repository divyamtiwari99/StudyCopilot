import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import AuroraBackground from "../components/background/AuroraBackground";
import { queryClient } from "../config/queryClient";
import { router } from "../routes/AppRouter";

export default function AppProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuroraBackground>
        <RouterProvider router={router} />
      </AuroraBackground>
    </QueryClientProvider>
  );
}