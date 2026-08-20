import crypto from "crypto";

export function hashRefreshToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function createTokenFamilyId(): string {
  return crypto.randomUUID();
}

export function createCsrfToken(): string {
  return crypto.randomBytes(32).toString("hex");
}
