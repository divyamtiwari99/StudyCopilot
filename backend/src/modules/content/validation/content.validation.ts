import { z } from "zod";

export const uploadContentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3)
    .max(150),
});