import type { Response } from "express";
import { env } from "../../../config/env.js";
import { createCsrfToken } from "./refresh-token.js";

const secure = env.NODE_ENV === "production";
const sameSite: "none" | "lax" = secure ? "none" : "lax";

export function setAuthCookies(res: Response) {
  const csrf = createCsrfToken();
  res.cookie(env.CSRF_COOKIE_NAME, csrf, {
    httpOnly: false,
    secure,
    sameSite,
    path: "/",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return csrf;
}

export function setRefreshCookie(res: Response, token: string) {
  res.cookie(env.REFRESH_COOKIE_NAME, token, {
    httpOnly: true,
    secure,
    sameSite,
    path: "/api/auth",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}

export function clearAuthCookies(res: Response) {
  res.clearCookie(env.REFRESH_COOKIE_NAME, { httpOnly: true, secure, sameSite, path: "/api/auth" });
  res.clearCookie(env.CSRF_COOKIE_NAME, { httpOnly: false, secure, sameSite, path: "/" });
}
