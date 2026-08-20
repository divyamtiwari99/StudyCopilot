import type { NextFunction, Request, Response } from "express";
import { env } from "../../../config/env.js";

export function csrfMiddleware(req: Request, res: Response, next: NextFunction) {
  const cookieToken = req.cookies?.[env.CSRF_COOKIE_NAME];
  const headerToken = req.get("X-StudyCopilot-CSRF");
  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return res.status(403).json({ success: false, message: "Invalid security token." });
  }
  next();
}
