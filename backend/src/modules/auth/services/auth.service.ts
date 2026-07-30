import { UserModel } from "../models/user.model.js";
import {
  comparePassword,
  hashPassword,
} from "../utils/password.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.js";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

class AuthService {
  async register(input: RegisterInput) {
    const existingUser = await UserModel.findOne({
      email: input.email.toLowerCase(),
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await hashPassword(
      input.password
    );

    const user = await UserModel.create({
      name: input.name,
      email: input.email.toLowerCase(),
      password: hashedPassword,
    });

    const safeUser = await UserModel.findById(
      user._id
    ).select("-password");

    const accessToken = generateAccessToken(
      user.id
    );

    const refreshToken = generateRefreshToken(
      user.id
    );

    return {
      user: safeUser,
      accessToken,
      refreshToken,
    };
  }

  async login(input: LoginInput) {
    const user = await UserModel.findOne({
      email: input.email.toLowerCase(),
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const validPassword =
      await comparePassword(
        input.password,
        user.password
      );

    if (!validPassword) {
      throw new Error("Invalid credentials");
    }

    const safeUser = await UserModel.findById(
      user._id
    ).select("-password");

    const accessToken = generateAccessToken(
      user.id
    );

    const refreshToken = generateRefreshToken(
      user.id
    );

    return {
      user: safeUser,
      accessToken,
      refreshToken,
    };
  }
}

export const authService =
  new AuthService();