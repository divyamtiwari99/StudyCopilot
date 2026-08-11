import {
  createContext,
  useContext,
} from "react";

import type {
  
} from "react";

import { useSettings } from "../hooks/useSettings";

type SettingsContextValue =
  ReturnType<
    typeof useSettings
  >;

const SettingsContext =
  createContext<
    SettingsContextValue | null
  >(null);

interface Props {
  children:
    React.ReactNode;
}

export function SettingsProvider({
  children,
}: Props) {
  const value =
    useSettings();

  return (
    <SettingsContext.Provider
      value={value}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettingsContext() {
  const context =
    useContext(
      SettingsContext,
    );

  if (!context) {
    throw new Error(
      "useSettingsContext must be used inside SettingsProvider.",
    );
  }

  return context;
}