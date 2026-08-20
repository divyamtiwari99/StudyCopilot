import { api } from "../lib/api";

import type {
  LoginResponse,
} from "../types/auth";


export interface LoginRequest {

  email: string;

  password: string;

}


export interface RegisterRequest {

  name: string;

  email: string;

  password: string;

}


export interface UpdateProfileRequest {

  name?: string;

  email?: string;

  avatar?: string;

}





class AuthService {


  async login(
    payload: LoginRequest,
  ): Promise<LoginResponse> {


    const response =
      await api.post(

        "/auth/login",

        payload,

      );



    return response.data;


  }









  async register(
    payload: RegisterRequest,
  ) {


    const response =
      await api.post(

        "/auth/register",

        payload,

      );



    return response.data;


  }









  async me() {


    const response =
      await api.get(

        "/auth/me",

      );



    return response.data;


  }









  async updateProfile(
    payload: UpdateProfileRequest,
  ) {


    const response =
      await api.put(

        "/auth/profile",

        payload,

      );



    return response.data;


  }










  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await api.post("/auth/profile/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 30_000,
    });
    return response.data;
  }

  async logout() {

  const response =
    await api.post(
      "/auth/logout",
    );


  return response.data;

}



}





const authService =
  new AuthService();



export default authService;