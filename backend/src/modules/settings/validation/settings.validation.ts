import { z } from "zod";

export const settingsUpdateSchema = z.object({
  ai: z.object({
    defaultMode: z.enum(["study", "assistant", "hybrid"]).optional(),
    responseLength: z.enum(["short", "balanced", "detailed"]).optional(),
    citations: z.boolean().optional(),
    deepReasoning: z.boolean().optional(),
  }).optional(),
  appearance: z.object({
    theme: z.enum(["arctic", "midnight", "forest", "sunset", "carbon"]).optional(),
    glassEffect: z.boolean().optional(),
    accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
    compactMode: z.boolean().optional(),
    animations: z.boolean().optional(),
  }).optional(),
  notifications: z.object({
    studyReminder: z.boolean().optional(),
    emailNotifications: z.boolean().optional(),
    aiUpdates: z.boolean().optional(),
    weeklyReport: z.boolean().optional(),
  }).optional(),
}).strict();
