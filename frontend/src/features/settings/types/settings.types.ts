export type ThemeMode =
  | "arctic"
  | "midnight"
  | "forest"
  | "sunset"
  | "carbon";



export type AccentColor =
  | "teal"
  | "indigo"
  | "blue"
  | "violet"
  | "emerald"
  | "orange"
  | "rose"
  | "cyan"
  | "amber";



export type AIMode =
  | "study"
  | "assistant"
  | "hybrid";



export interface NotificationSettings {

  studyReminder: boolean;

  emailNotifications: boolean;

  aiUpdates: boolean;

  weeklyReport: boolean;

}



export interface AppearanceSettings {

  theme: ThemeMode;

  glassEffect: boolean;

  accentColor: AccentColor;

  compactMode: boolean;

  animations: boolean;

}



export interface AISettings {

  defaultMode: AIMode;

  responseLength:
    | "short"
    | "balanced"
    | "detailed";

  citations: boolean;

  deepReasoning: boolean;

}



export interface StorageSettings {

  used: number;

  total: number;

  documents: number;

  chats: number;

}



export interface UserSettings {

  name: string;

  email: string;

  avatar?: string;

  plan: string;

  joinedAt: string;

}



export interface SettingsState {

  user: UserSettings;

  ai: AISettings;

  appearance: AppearanceSettings;

  notifications: NotificationSettings;

  storage: StorageSettings;

}