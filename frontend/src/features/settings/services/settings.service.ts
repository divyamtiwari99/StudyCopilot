import { api } from "@/lib/api";
import type { AccentColor, SettingsState } from "../types/settings.types";

const ACCENT_TO_HEX: Record<AccentColor, string> = {
  teal: "#0F766E",
  indigo: "#6366F1",
  blue: "#2563EB",
  violet: "#7C3AED",
  emerald: "#10B981",
  orange: "#F97316",
  rose: "#F43F5E",
  cyan: "#06B6D4",
  amber: "#F59E0B",
};

const HEX_TO_ACCENT: Record<string, AccentColor> = Object.fromEntries(
  Object.entries(ACCENT_TO_HEX).map(([name, hex]) => [hex.toLowerCase(), name]),
) as Record<string, AccentColor>;

function normalizeAccentColor(value: unknown): AccentColor {
  if (typeof value === "string" && value in ACCENT_TO_HEX) return value as AccentColor;
  if (typeof value === "string") return HEX_TO_ACCENT[value.toLowerCase()] ?? "indigo";
  return "indigo";
}

function normalizeSettings(data: Partial<SettingsState>): Partial<SettingsState> {
  return {
    ...data,
    appearance: data.appearance
      ? { ...data.appearance, accentColor: normalizeAccentColor(data.appearance.accentColor) }
      : undefined,
  };
}

export async function getSettings(): Promise<SettingsState> {
  const response = await api.get<{ success: boolean; settings: SettingsState }>("/settings");
  return normalizeSettings(response.data.settings) as SettingsState;
}

export async function saveSettings(settings: SettingsState): Promise<SettingsState> {
  const response = await api.put("/settings", {
    ai: settings.ai,
    appearance: {
      ...settings.appearance,
      accentColor: ACCENT_TO_HEX[settings.appearance.accentColor],
    },
    notifications: settings.notifications,
  });
  return normalizeSettings(response.data.settings) as SettingsState;
}
