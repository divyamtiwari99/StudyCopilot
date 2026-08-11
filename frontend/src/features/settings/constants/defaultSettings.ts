import type {
  SettingsState,
} from "../types/settings.types";


export const DEFAULT_SETTINGS: SettingsState = {

  user: {

    name: "",

    email: "",

    plan: "Free",

    joinedAt: "",

  },


  ai: {

    defaultMode: "hybrid",

    responseLength: "balanced",

    citations: true,

    deepReasoning: true,

  },


  appearance: {

    theme: "dark",

    glassEffect: true,

    accentColor: "cyan",

    compactMode: false,

    animations: true,

  },


  notifications: {

    studyReminder: true,

    emailNotifications: false,

    aiUpdates: true,

    weeklyReport: true,

  },


  storage: {

    used: 0,

    total: 5,

    documents: 0,

    chats: 0,

  },

};