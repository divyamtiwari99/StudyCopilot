import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useAuthStore } from "@/store/auth.store";

import { DEFAULT_SETTINGS } from "../constants/defaultSettings";

import {
  getSettings,
  saveSettings,
} from "../services/settings.service";

import type {
  AISettings,
  AppearanceSettings,
  NotificationSettings,
  SettingsState,
  UserSettings,
} from "../types/settings.types";

export function useSettings() {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );

  const [settings, setSettings] =
    useState<SettingsState>(
      DEFAULT_SETTINGS,
    );

  const settingsRef =
    useRef<SettingsState>(
      DEFAULT_SETTINGS,
    );

  const [saving, setSaving] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    if (!isAuthenticated) {
      setSettings(DEFAULT_SETTINGS);
      settingsRef.current =
        DEFAULT_SETTINGS;
      setSaving(false);
      setError(null);
      setLoading(false);

      return () => {
        cancelled = true;
      };
    }

    setLoading(true);

    async function loadSettings() {
      setError(null);

      try {
        const data = await getSettings();

        const mergedSettings: SettingsState =
          {
            ...DEFAULT_SETTINGS,
            ...data,

            user: {
              ...DEFAULT_SETTINGS.user,
              ...data.user,
            },

            ai: {
              ...DEFAULT_SETTINGS.ai,
              ...data.ai,
            },

            appearance: {
              ...DEFAULT_SETTINGS.appearance,
              ...data.appearance,
            },

            notifications: {
              ...DEFAULT_SETTINGS.notifications,
              ...data.notifications,
            },

            storage: {
              ...DEFAULT_SETTINGS.storage,
              ...data.storage,
            },
          };

        if (cancelled) {
          return;
        }

        setSettings(mergedSettings);
        settingsRef.current =
          mergedSettings;
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError);

          console.error(
            "Failed to load settings",
            loadError,
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadSettings();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  useEffect(() => {
    const handleUnauthorized = () => {
      setSettings(DEFAULT_SETTINGS);
      settingsRef.current =
        DEFAULT_SETTINGS;
      setSaving(false);
      setError(null);
      setLoading(false);
    };

    window.addEventListener(
      "studycopilot:unauthorized",
      handleUnauthorized,
    );

    return () => {
      window.removeEventListener(
        "studycopilot:unauthorized",
        handleUnauthorized,
      );
    };
  }, []);

  const updateUser = useCallback(
    (data: Partial<UserSettings>) => {
      setSettings((previous) => {
        const updated: SettingsState = {
          ...previous,

          user: {
            ...previous.user,
            ...data,
          },
        };

        settingsRef.current =
          updated;

        return updated;
      });
    },
    [],
  );

  const updateAI = useCallback(
    (data: Partial<AISettings>) => {
      setSettings((previous) => {
        const updated: SettingsState = {
          ...previous,

          ai: {
            ...previous.ai,
            ...data,
          },
        };

        settingsRef.current =
          updated;

        return updated;
      });
    },
    [],
  );

  const updateAppearance = useCallback(
    (
      data: Partial<AppearanceSettings>,
    ) => {
      setSettings((previous) => {
        const updated: SettingsState = {
          ...previous,

          appearance: {
            ...previous.appearance,
            ...data,
          },
        };

        settingsRef.current =
          updated;

        return updated;
      });
    },
    [],
  );

  const updateNotifications = useCallback(
    (
      data: Partial<NotificationSettings>,
    ) => {
      setSettings((previous) => {
        const updated: SettingsState = {
          ...previous,

          notifications: {
            ...previous.notifications,
            ...data,
          },
        };

        settingsRef.current =
          updated;

        return updated;
      });
    },
    [],
  );

  const save = useCallback(async () => {
    setSaving(true);
    setError(null);

    try {
      const updatedSettings =
        await saveSettings(
          settingsRef.current,
        );

      const mergedSettings: SettingsState =
        {
          ...DEFAULT_SETTINGS,
          ...updatedSettings,

          user: {
            ...DEFAULT_SETTINGS.user,
            ...updatedSettings.user,
          },

          ai: {
            ...DEFAULT_SETTINGS.ai,
            ...updatedSettings.ai,
          },

          appearance: {
            ...DEFAULT_SETTINGS.appearance,
            ...updatedSettings.appearance,
          },

          notifications: {
            ...DEFAULT_SETTINGS.notifications,
            ...updatedSettings.notifications,
          },

          storage: {
            ...DEFAULT_SETTINGS.storage,
            ...updatedSettings.storage,
          },
        };

      setSettings(mergedSettings);

      settingsRef.current =
        mergedSettings;
    } catch (saveError) {
      setError(saveError);

      console.error(
        "Failed to save settings",
        saveError,
      );

      throw saveError;
    } finally {
      setSaving(false);
    }
  }, []);

  const usedPercentage = useMemo(() => {
    if (settings.storage.total === 0) {
      return 0;
    }

    return (
      (settings.storage.used /
        settings.storage.total) *
      100
    );
  }, [
    settings.storage.used,
    settings.storage.total,
  ]);

  return {
    settings,
    saving,
    loading,
    error,
    usedPercentage,

    updateUser,
    updateAI,
    updateAppearance,
    updateNotifications,

    save,
  };
}