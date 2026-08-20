import { useEffect } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import AuroraBackground from "../components/background/AuroraBackground";
import AppErrorBoundary from "../components/system/AppErrorBoundary";
import OfflineIndicator from "../components/system/OfflineIndicator";
import { queryClient } from "../config/queryClient";
import { router } from "../routes/AppRouter";
import { useAuthStore } from "../store/auth.store";
import storage from "../lib/storage";

import AppearanceSync from "../features/settings/components/AppearanceSync";
import { SettingsProvider } from "../features/settings/components/SettingsContext";

function Bootstrap() {
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    if (!storage.getAccessToken()) {
      useAuthStore.setState({ initialized: true, loading: false });
      return;
    }

    const timeout = window.setTimeout(() => {
      useAuthStore.setState({
        initialized: true,
        loading: false,
        isAuthenticated: false,
        user: null,
      });
      storage.clear();
    }, 12_000);

    void loadUser().finally(() => {
      window.clearTimeout(timeout);
    });

    return () => window.clearTimeout(timeout);
  }, [loadUser]);

  return null;
}

export default function AppProviders() {
  return (
    <AppErrorBoundary>
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
            <OfflineIndicator />
          </AuroraBackground>
        </SettingsProvider>
      </QueryClientProvider>
    </AppErrorBoundary>
  );
}
