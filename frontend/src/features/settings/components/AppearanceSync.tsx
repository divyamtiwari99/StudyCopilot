import { useEffect } from "react";

import { useSettingsContext } from "./SettingsContext";

const ACCENT_MAP: Record<string, string> = {
  cyan: "#06b6d4",
  violet: "#8b5cf6",
  emerald: "#10b981",
  amber: "#f59e0b",
};

export default function AppearanceSync() {
  const {
    settings,
  } = useSettingsContext();

  const {
    theme,
    accentColor,
    glassEffect,
    compactMode,
    animations,
  } = settings.appearance;

  useEffect(() => {
    const root =
      document.documentElement;

    root.classList.remove(
      "dark",
      "oled",
    );

    root.classList.add(theme);

    root.style.setProperty(
      "--accent-color",
      ACCENT_MAP[accentColor] ?? accentColor,
    );

    root.dataset.glass =
      glassEffect
        ? "true"
        : "false";

    root.dataset.compact =
      compactMode
        ? "true"
        : "false";

    root.dataset.animations =
      animations
        ? "true"
        : "false";

  }, [
    theme,
    accentColor,
    glassEffect,
    compactMode,
    animations,
  ]);

  return null;
}