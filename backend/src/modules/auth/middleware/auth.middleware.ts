import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import { UserModel } from "../models/user.model.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const payload = verifyAccessToken(token);

    const user = await UserModel.findById(
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