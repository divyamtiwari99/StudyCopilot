import { useEffect } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import { Toaster } from "sonner";

import AuroraBackground from "../components/background/AuroraBackground";
import { queryClient } from "../config/queryClient";
import { router } from "../routes/AppRouter";

import { useAuthStore } from "../store/auth.store";

function Bootstrap() {
  const loadUser = useAuthStore(
    (state) => state.loadUser,
  );

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return <RouterProvider router={router} />;
}

export default function AppProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuroraBackground>

        <Bootstrap />

        <Toaster
          richColors
          position="top-right"
          closeButton
          expand
          duration={3000}
        />

      </AuroraBackground>
    </QueryClientProvider>
  );
}