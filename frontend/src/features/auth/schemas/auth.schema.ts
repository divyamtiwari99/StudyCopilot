import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters."),

    email: z.email("Please enter a valid email."),

    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters."
      ),

    confirmPassword: z.string(),
  })
  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match.",
    }
  );

export type LoginSchema =
  z.infer<typeof loginSchema>;

export type RegisterSchema =
  z.infer<typeof registerSchema>;