import { Request, Response } from "express";

import { authService } from "../services/auth.service.js";
import {
  loginSchema,
  registerSchema,
} from "../validation/auth.validation.js";

class AuthController {
  async register(
    req: Request,
    res: Response
  ) {
    try {
      const body =
        registerSchema.parse(req.body);

      const result =
        await authService.register(body);

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message:
          error.message ??
          "Registration failed",
      });
    }
  }

  async login(
    req: Request,
    res: Response
  ) {
    try {
      const body =
        loginSchema.parse(req.body);

      const result =
        await authService.login(body);

      return res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message:
          error.message ??
          "Login failed",
      });
    }
  }

  async me(
    req: Request,
    res: Response
  ) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const user =
        await authService.getCurrentUser(
          req.user.id
        );

      return res.json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message:
          error.message ??
          "Unauthorized",
      });
    }
  }
}

export const authController =
  new AuthController();