import { useEffect } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import AuroraBackground from "../components/background/AuroraBackground";
import { queryClient } from "../config/queryClient";
import { router } from "../routes/AppRouter";
import { useAuthStore } from "../store/auth.store";

import AppearanceSync from "../features/settings/components/AppearanceSync";
import {
  SettingsProvider,
} from "../features/settings/components/SettingsContext";

function Bootstrap() {
  const loadUser = useAuthStore(
    (state) => state.loadUser,
  );

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return null;
}

export default function AppProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <AppearanceSync />

        <AuroraBackground>
          <Bootstrap />

          <Toaster
            richColors
            position="top-right"
            closeButton
            expand
            duration={3000}
          />

          <RouterProvider router={router} />
        </AuroraBackground>
      </SettingsProvider>
    </QueryClientProvider>
  );
}