import { api } from "@/lib/api";

import type {
  SettingsState,
} from "../types/settings.types";



export async function getSettings() {

  const response =
    await api.get(
      "/settings",
    );


  return response.data.settings;

}




export async function saveSettings(
  settings: SettingsState,
) {

  const response =
    await api.put(
      "/settings",
      settings,
    );


  return response.data.settings;

}