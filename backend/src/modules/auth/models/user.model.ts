import mongoose, { Schema, type HydratedDocument } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  avatarStorageKey?: string;
  role: "student" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export type UserDocument = HydratedDocument<IUser>;

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    avatarStorageKey: { type: String, default: "" },
    role: { type: String, enum: ["student", "admin"], default: "student" },
  },
  { timestamps: true },
);

export const UserModel: mongoose.Model<IUser> =
  (mongoose.models.User as mongoose.Model<IUser> | undefined) ??
  mongoose.model<IUser>("User", UserSchema);
export default UserModel;
