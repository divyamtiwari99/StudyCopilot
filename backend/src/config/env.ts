import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT ?? 5000),

  MONGODB_URI:
    process.env.MONGODB_URI ?? "",

  GEMINI_API_KEY:
    process.env.GEMINI_API_KEY ?? "",

  JWT_SECRET:
    process.env.JWT_SECRET ?? "",

  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET ?? "",

  // ===========================
  // Supabase Storage
  // ===========================

  SUPABASE_URL:
    process.env.SUPABASE_URL ?? "",

  SUPABASE_SERVICE_ROLE_KEY:
    process.env
      .SUPABASE_SERVICE_ROLE_KEY ?? "",

  SUPABASE_BUCKET:
    process.env.SUPABASE_BUCKET ??
    "documents",
};