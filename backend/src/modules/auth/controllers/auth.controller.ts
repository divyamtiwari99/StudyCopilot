import type { Request, Response } from "express";
import { ZodError } from "zod";

import { authService } from "../services/auth.service.js";
import { loginSchema, registerSchema, profileUpdateSchema } from "../validation/auth.validation.js";
import { clearAuthCookies, setAuthCookies, setRefreshCookie } from "../utils/cookies.js";
import { env } from "../../../config/env.js";

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : "Request failed";
}

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const result = await authService.register(registerSchema.parse(req.body));
      setAuthCookies(res);
      setRefreshCookie(res, result.refreshToken);
      const { refreshToken: _refreshToken, ...publicResult } = result;
      return res.status(201).json({ success: true, data: publicResult });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({ success: false, message: "Invalid registration data." });
      }
      if (messageOf(error) === "Email already exists") {
        return res.status(409).json({ success: false, message: "An account with this email already exists." });
      }
      console.error("Registration failed:", error);
      return res.status(500).json({ success: false, message: "Registration failed. Please try again later." });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await authService.login(loginSchema.parse(req.body));
      setAuthCookies(res);
      setRefreshCookie(res, result.refreshToken);
      const { refreshToken: _refreshToken, ...publicResult } = result;
      return res.json({ success: true, data: publicResult });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({ success: false, message: "Invalid login data." });
      }
      if (messageOf(error) === "Invalid credentials") {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
      console.error("Login failed:", error);
      return res.status(500).json({ success: false, message: "Login failed. Please try again later." });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies?.[env.REFRESH_COOKIE_NAME];
      const result = await authService.refresh(refreshToken);
      setAuthCookies(res);
      setRefreshCookie(res, result.refreshToken);
      const { refreshToken: _refreshToken, ...publicResult } = result;
      return res.json({ success: true, data: publicResult });
    } catch (error: unknown) {
      clearAuthCookies(res);
      return res.status(401).json({ success: false, message: "Unable to refresh session" });
    }
  }

  async me(req: Request, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
      const user = await authService.getCurrentUser(req.user.id);
      return res.json({ success: true, data: user });
    } catch (error: unknown) {
      console.error("Current-user lookup failed:", error);
      return res.status(500).json({ success: false, message: "Unable to load your account." });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
      const user = await authService.updateProfile(req.user.id, profileUpdateSchema.parse(req.body));
      return res.json({ success: true, data: user });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({ success: false, message: "Invalid profile data." });
      }
      if (messageOf(error) === "Email already exists") {
        return res.status(409).json({ success: false, message: "An account with this email already exists." });
      }
      console.error("Profile update failed:", error);
      return res.status(500).json({ success: false, message: "Profile update failed. Please try again later." });
    }
  }

  async uploadAvatar(req: Request, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
      const file = req.file;
      if (!file) return res.status(400).json({ success: false, message: "Profile image is required." });
      const user = await authService.updateAvatar(req.user.id, file);
      return res.json({ success: true, data: user });
    } catch (error: unknown) {
      const message = messageOf(error);
      if (message.includes("Unsupported avatar") || message.includes("Avatar image")) {
        return res.status(400).json({ success: false, message });
      }
      console.error("Avatar upload failed:", error);
      return res.status(500).json({ success: false, message: "Profile image upload failed. Please try again later." });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies?.[env.REFRESH_COOKIE_NAME];
      await authService.logout(refreshToken);
    } catch (error: unknown) {
      console.error("Logout failed:", error);
    } finally {
      clearAuthCookies(res);
    }

    return res.json({ success: true, data: { message: "Logged out successfully" } });
  }
}

export const authController = new AuthController();
