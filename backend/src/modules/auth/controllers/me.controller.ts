import { Request, Response } from "express";
import { UserModel } from "../models/user.model.js";

class MeController {
  async me(
    req: Request,
    res: Response
  ) {
    const user = await UserModel.findById(
      req.user?.id
    ).select("-password");

    return res.json({
      success: true,
      data: user,
    });
  }
}

export const meController =
  new MeController();