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


    // Premium light-first SaaS identity
    theme: "arctic",


    // Soft glass surfaces
    glassEffect: true,


    // Premium default brand accent
    accentColor: "indigo",


    // Comfortable spacing
    compactMode: false,


    // Smooth interactions
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