import {
  NextFunction,
  Request,
  Response,
} from "express";

import { verifyAccessToken } from "../utils/jwt.js";
import { UserModel } from "../models/user.model.js";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const header =
      req.headers.authorization;

    if (
      !header ||
      !header.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = header.replace(
      "Bearer ",
      ""
    );

    const payload =
      verifyAccessToken(token);

    const user =
      await UserModel.findById(
        payload.userId
      );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = {
      id: user.id,
    };

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
}