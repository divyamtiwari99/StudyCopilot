import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../../../config/env.js";

interface JwtPayload {
  userId: string;
  jti?: string;
  exp?: number;
}

export function generateAccessToken(userId: string): string {
  return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "15m" });
}

export function generateRefreshToken(userId: string, jti = crypto.randomUUID()): string {
  return jwt.sign({ userId, jti }, env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload & { jti: string } {
  const payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;
  if (!payload.userId || !payload.jti) throw new Error("Invalid refresh token");
  return payload as JwtPayload & { jti: string };
}
