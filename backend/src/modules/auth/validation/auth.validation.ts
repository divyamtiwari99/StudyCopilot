import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(100),
});

export const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1).max(100),
});

export const profileUpdateSchema = z.object({
  name: z.string().trim().min(2).max(50).optional(),
  email: z.string().trim().email().max(254).optional(),
}).strict();
