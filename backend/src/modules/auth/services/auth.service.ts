import { Types } from "mongoose";
import { randomUUID } from "node:crypto";
import { storageManager } from "../../../core/storage/storage.manager.js";
import { UserModel } from "../models/user.model.js";
import { RefreshSessionModel } from "../models/refresh-session.model.js";
import { createTokenFamilyId, hashRefreshToken } from "../utils/refresh-token.js";

import {
  comparePassword,
  hashPassword,
} from "../utils/password.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
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



interface ProfileUpdateInput {
  name?: string;
  email?: string;
}






class AuthService {

  private async toPublicUser(user: ReturnType<typeof UserModel.hydrate> | null) {
    if (!user) return null;
    const plain = user.toObject();
    if (plain.avatarStorageKey) {
      plain.avatar = await storageManager.getSignedUrl(plain.avatarStorageKey, 900).catch(() => "");
    }
    const { password: _password, avatarStorageKey: _avatarStorageKey, ...publicUser } = plain;
    return publicUser;
  }



  async register(
    input: RegisterInput,
  ) {


    const email =
      input.email
        .toLowerCase()
        .trim();




    const existingUser =
      await UserModel.findOne({

        email,

      });





    if (existingUser) {

      throw new Error(
        "Email already exists",
      );

    }







    const hashedPassword =
      await hashPassword(

        input.password,

      );







    const user = await UserModel.create({
      name: input.name.trim(),
      email,
      password: hashedPassword,
    }).catch((error: unknown) => {
      if (typeof error === "object" && error !== null && "code" in error && error.code === 11000) {
        throw new Error("Email already exists");
      }
      throw error;
    });

    const safeUser = await this.toPublicUser(
      await UserModel.findById(user._id).select("-password"),
    );







    const accessToken =
      generateAccessToken(

        user.id,

      );







    const refreshToken = (await this.issueRefreshToken(user.id)).token;







    return {

      user: safeUser,

      accessToken,

      refreshToken,

    };


  }









  async login(
    input: LoginInput,
  ) {


    const email =
      input.email
        .toLowerCase()
        .trim();







    const user =
      await UserModel.findOne({

        email,

      });







    if (!user) {

      throw new Error(
        "Invalid credentials",
      );

    }







    const validPassword =
      await comparePassword(

        input.password,

        user.password,

      );







    if (!validPassword) {

      throw new Error(
        "Invalid credentials",
      );

    }







    const safeUser = await this.toPublicUser(
      await UserModel.findById(user._id).select("-password"),
    );







    const accessToken =
      generateAccessToken(

        user.id,

      );







    const refreshToken = (await this.issueRefreshToken(user.id)).token;







    return {

      user: safeUser,

      accessToken,

      refreshToken,

    };


  }









  private async issueRefreshToken(userId: string, familyId = createTokenFamilyId()) {
    const token = generateRefreshToken(userId);
    const payload = verifyRefreshToken(token);
    await RefreshSessionModel.create({
      userId: new Types.ObjectId(userId),
      tokenHash: hashRefreshToken(token),
      familyId,
      expiresAt: new Date((payload.exp ?? Math.floor(Date.now() / 1000) + 30 * 86400) * 1000),
    });
    return { token, hash: hashRefreshToken(token), familyId };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken?.trim()) throw new Error("Refresh token is required");

    const payload = verifyRefreshToken(refreshToken);
    const tokenHash = hashRefreshToken(refreshToken);
    const session = await RefreshSessionModel.findOne({
      tokenHash,
      userId: payload.userId,
    }).lean();

    if (!session) throw new Error("Refresh session is no longer valid");

    if (session.revokedAt || session.expiresAt.getTime() <= Date.now()) {
      await RefreshSessionModel.updateMany(
        { userId: payload.userId, familyId: session.familyId, revokedAt: null },
        { $set: { revokedAt: new Date() } },
      );
      throw new Error("Refresh session is no longer valid");
    }

    const user = await UserModel.findById(payload.userId).select("-password");
    if (!user) throw new Error("User not found");

    // Consume the current token atomically BEFORE issuing its replacement.
    // This prevents two concurrent refresh requests from both minting valid
    // replacement tokens from the same refresh token.
    const consumed = await RefreshSessionModel.findOneAndUpdate(
      {
        _id: session._id,
        tokenHash,
        userId: payload.userId,
        revokedAt: null,
        expiresAt: { $gt: new Date() },
      },
      { $set: { revokedAt: new Date() } },
      { new: true },
    ).lean();

    if (!consumed) {
      await RefreshSessionModel.updateMany(
        { userId: payload.userId, familyId: session.familyId, revokedAt: null },
        { $set: { revokedAt: new Date() } },
      );
      throw new Error("Refresh session is no longer valid");
    }

    try {
      const next = await this.issueRefreshToken(user.id, session.familyId);
      await RefreshSessionModel.updateOne(
        { _id: session._id, tokenHash },
        { $set: { replacedByHash: next.hash } },
      );
      return {
        user: await this.toPublicUser(user),
        accessToken: generateAccessToken(user.id),
        refreshToken: next.token,
      };
    } catch (error) {
      // The old token is already consumed. Fail closed rather than allowing
      // it to be reused if replacement issuance fails.
      await RefreshSessionModel.updateMany(
        { userId: payload.userId, familyId: session.familyId, revokedAt: null },
        { $set: { revokedAt: new Date() } },
      ).catch(() => undefined);
      throw error;
    }
  }

  async getCurrentUser(
    userId: string,
  ) {


    const user =
      await UserModel.findById(

        userId,

      ).select(

        "-password",

      );







    if (!user) {

      throw new Error(
        "User not found",
      );

    }







    return this.toPublicUser(user);


  }









  async updateProfile(userId: string, data: ProfileUpdateInput) {
    const updateData: Partial<ProfileUpdateInput> = {};

    if (data.name !== undefined) updateData.name = data.name.trim();
    if (data.email !== undefined) {
      const email = data.email.toLowerCase().trim();
      const existing = await UserModel.findOne({ email, _id: { $ne: userId } }).lean();
      if (existing) throw new Error("Email already exists");
      updateData.email = email;
    }
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true },
    ).select("-password");

    if (!user) throw new Error("User not found");
    return this.toPublicUser(user);
  }

  async updateAvatar(userId: string, file: { buffer: Buffer; originalname: string; mimetype: string }) {
    const allowed = new Set(["image/png", "image/jpeg", "image/webp"]);
    if (!allowed.has(file.mimetype)) throw new Error("Unsupported avatar image type.");
    if (!file.buffer.length || file.buffer.length > 5 * 1024 * 1024) throw new Error("Avatar image must be smaller than 5 MB.");

    const extension = file.mimetype === "image/png" ? ".png" : file.mimetype === "image/webp" ? ".webp" : ".jpg";
    const key = `${userId}/profile/avatar-${randomUUID()}${extension}`;
    const uploaded = await storageManager.upload({ file: file.buffer, fileName: `avatar${extension}`, mimeType: file.mimetype, path: key });
    const previous = await UserModel.findById(userId).select("avatarStorageKey").lean() as { avatarStorageKey?: string } | null;

    try {
      const user = await UserModel.findByIdAndUpdate(userId, { $set: { avatar: "", avatarStorageKey: uploaded.key } }, { new: true, runValidators: true }).select("-password");
      if (!user) throw new Error("User not found");
      if (previous?.avatarStorageKey && previous.avatarStorageKey !== uploaded.key) await storageManager.delete(previous.avatarStorageKey).catch(() => undefined);
      return this.toPublicUser(user);
    } catch (error) {
      await storageManager.delete(uploaded.key).catch(() => undefined);
      throw error;
    }
  }

  async logout(refreshToken?: string) {
    if (refreshToken) {
      await RefreshSessionModel.updateOne(
        { tokenHash: hashRefreshToken(refreshToken), revokedAt: null },
        { $set: { revokedAt: new Date() } },
      );
    }
    return { message: "Logged out successfully" };
  }





}





export const authService =
  new AuthService();