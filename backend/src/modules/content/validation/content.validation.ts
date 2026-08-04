import { z } from "zod";

export const uploadContentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3)
    .max(150),
});

export const renameContentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(
      150,
      "Title must be less than 150 characters.",
    ),
});

export type UploadContentInput =
  z.infer<
    typeof uploadContentSchema
  >;

export type RenameContentInput =
  z.infer<
    typeof renameContentSchema
  >;