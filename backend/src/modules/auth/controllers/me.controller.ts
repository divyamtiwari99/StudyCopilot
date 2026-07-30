import { Request, Response } from "express";

import { userService } from "../services/user.service.js";

class MeController {
  async me(
    req: Request,
    res: Response
  ) {
    const user =
      await userService.findById(
        req.user!.id
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      data: user,
    });
  }
}

export const meController =
  new MeController();