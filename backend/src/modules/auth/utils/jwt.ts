import jwt from "jsonwebtoken";
import { env } from "../../../config/env.js";

interface JwtPayload {
  userId: string;
}

export function generateAccessToken(
  userId: string
): string {
  return jwt.sign(
    { userId },
    env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );
}

export function generateRefreshToken(
  userId: string
): string {
  return jwt.sign(
    { userId },
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: "30d",
    }
  );
}

export function verifyAccessToken(
  token: string
): JwtPayload {
  return jwt.verify(
    token,
    env.JWT_SECRET
  ) as JwtPayload;
}

export function verifyRefreshToken(
  token: string
): JwtPayload {
  return jwt.verify(
    token,
    env.JWT_REFRESH_SECRET
  ) as JwtPayload;
}