import { UserModel } from "../models/user.model.js";

class UserService {
  async findById(userId: string) {
    return UserModel.findById(userId).select("-password");
  }

  async findByEmail(email: string) {
    return UserModel.findOne({
      email: email.toLowerCase(),
    });
  }

  async exists(email: string) {
    const user = await UserModel.exists({
      email: email.toLowerCase(),
    });

    return !!user;
  }
}

export const userService =
  new UserService();