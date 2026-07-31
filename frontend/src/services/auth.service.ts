import { api } from "../lib/api";
import type { LoginResponse } from "../types/auth";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

class AuthService {
  async login(
    payload: LoginRequest
  ): Promise<LoginResponse> {
    const response =
      await api.post<LoginResponse>(
        "/auth/login",
        payload
      );

    return response.data;
  }

  async register(
    payload: RegisterRequest
  ): Promise<LoginResponse> {
    const response =
      await api.post<LoginResponse>(
        "/auth/register",
        payload
      );

    return response.data;
  }

  async me() {
    const response =
      await api.get("/auth/me");

    return response.data;
  }

  async logout() {
    return Promise.resolve();
  }
}

const authService = new AuthService();

export default authService;