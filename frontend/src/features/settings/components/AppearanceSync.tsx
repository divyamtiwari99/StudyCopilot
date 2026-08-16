import { useEffect } from "react";

import { useSettingsContext } from "./SettingsContext";

import type {
  ThemeMode,
  AccentColor,
} from "../types/settings.types";



const THEME_MAP: Record<
  ThemeMode,
  Record<string, string>
> = {


  arctic: {

    background:
      "#FAFAF8",

    surface:
      "rgba(255,255,255,0.78)",

    "surface-solid":
      "#FFFFFF",

    surfaceHover:
      "#F7F7F5",

    "surface-elevated":
      "#FFFFFF",

    border:
      "#E7E5E4",

    "border-strong":
      "#D6D3D1",

    text:
      "#18181B",

    "text-secondary":
      "#3F3F46",

    muted:
      "#71717A",

  },



  midnight: {

    background:
      "#111827",

    surface:
      "rgba(31,41,55,0.85)",

    "surface-solid":
      "#1F2937",

    surfaceHover:
      "#374151",

    "surface-elevated":
      "#273449",

    border:
      "#374151",

    "border-strong":
      "#4B5563",

    text:
      "#F9FAFB",

    "text-secondary":
      "#E5E7EB",

    muted:
      "#9CA3AF",

  },



  forest: {

    background:
      "#F3F7F3",

    surface:
      "rgba(255,255,255,0.8)",

    "surface-solid":
      "#FFFFFF",

    surfaceHover:
      "#E8F3E8",

    "surface-elevated":
      "#FFFFFF",

    border:
      "#D1E7D1",

    "border-strong":
      "#A7D3A7",

    text:
      "#123524",

    "text-secondary":
      "#24563B",

    muted:
      "#5B7A67",

  },



  sunset: {

    background:
      "#FFF7ED",

    surface:
      "rgba(255,255,255,0.8)",

    "surface-solid":
      "#FFFFFF",

    surfaceHover:
      "#FFEDD5",

    "surface-elevated":
      "#FFFFFF",

    border:
      "#FED7AA",

    "border-strong":
      "#FDBA74",

    text:
      "#431407",

    "text-secondary":
      "#7C2D12",

    muted:
      "#9A3412",

  },



  carbon: {

    background:
      "#FAFAFA",

    surface:
      "rgba(255,255,255,0.85)",

    "surface-solid":
      "#FFFFFF",

    surfaceHover:
      "#F4F4F5",

    "surface-elevated":
      "#FFFFFF",

    border:
      "#E4E4E7",

    "border-strong":
      "#D4D4D8",

    text:
      "#18181B",

    "text-secondary":
      "#3F3F46",

    muted:
      "#71717A",

  },


};






const ACCENT_MAP: Record<
  AccentColor,
  string
> = {


  teal:
    "#0F766E",


  indigo:
    "#6366F1",


  blue:
    "#2563EB",


  violet:
    "#7C3AED",


  emerald:
    "#10B981",


  orange:
    "#F97316",


  rose:
    "#F43F5E",


  cyan:
    "#06B6D4",


  amber:
    "#F59E0B",


};







export default function AppearanceSync() {


  const {
    settings,
  } =
    useSettingsContext();



  const {

    theme,

    accentColor,

    glassEffect,

    compactMode,

    animations,

  } =
    settings.appearance;





  useEffect(() => {


    const root =
      document.documentElement;




    const activeTheme =

      THEME_MAP[theme]

      ??

      THEME_MAP.arctic;






    root.dataset.theme =
      theme;





    Object.entries(
      activeTheme,
    )
    .forEach(
      ([key,value]) => {


        root.style.setProperty(

          `--${key}`,

          value,

        );


      },
    );





    root.style.setProperty(

      "--accent-color",

      ACCENT_MAP[accentColor]

      ??

      ACCENT_MAP.teal,

    );





    root.style.setProperty(

      "--accent-soft",

      "color-mix(in srgb,var(--accent-color) 12%,transparent)",

    );





    root.style.setProperty(

      "--shadow-soft",

      "0 20px 50px rgba(15,23,42,0.08)",

    );





    root.style.setProperty(

      "--shadow-card",

      "0 15px 40px rgba(15,23,42,0.06)",

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