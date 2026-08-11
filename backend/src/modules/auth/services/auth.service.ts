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



interface ProfileUpdateInput {

  name?: string;

  email?: string;

  avatar?: string;

}






class AuthService {



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







    const user =
      await UserModel.create({

        name:
          input.name.trim(),


        email,


        password:
          hashedPassword,

      });







    const safeUser =
      await UserModel.findById(

        user._id,

      ).select(

        "-password",

      );







    const accessToken =
      generateAccessToken(

        user.id,

      );







    const refreshToken =
      generateRefreshToken(

        user.id,

      );







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







    const safeUser =
      await UserModel.findById(

        user._id,

      ).select(

        "-password",

      );







    const accessToken =
      generateAccessToken(

        user.id,

      );







    const refreshToken =
      generateRefreshToken(

        user.id,

      );







    return {

      user: safeUser,

      accessToken,

      refreshToken,

    };


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







    return user;


  }









  async updateProfile(
    userId: string,
    data: ProfileUpdateInput,
  ) {


    const updateData: Record<string, any> = {};



    if (data.name) {

      updateData.name =
        data.name.trim();

    }



    if (data.email) {

      updateData.email =
        data.email
          .toLowerCase()
          .trim();

    }



    if (data.avatar !== undefined) {

      updateData.avatar =
        data.avatar;

    }







    const user =
      await UserModel.findByIdAndUpdate(

        userId,

        {

          $set:
            updateData,

        },

        {

          new: true,

        },

      ).select(

        "-password",

      );







    if (!user) {

      throw new Error(
        "User not found",
      );

    }







    return user;


  }

  async logout() {
  return {
    message: "Logged out successfully",
  };
}





}





export const authService =
  new AuthService();