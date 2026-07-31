import { create } from "zustand";

import authService from "../services/auth.service";
import storage from "../lib/storage";
import type { User } from "../types/auth";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;

  isAuthenticated: boolean;

  loading: boolean;

  initialized: boolean;

  login: (
    payload: LoginPayload
  ) => Promise<void>;

  register: (
    payload: RegisterPayload
  ) => Promise<void>;

  logout: () => void;

  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  isAuthenticated: false,

  loading: false,

  initialized: false,

  async login(payload) {
    set({
      loading: true,
    });

    try {
      const response = await authService.login(payload);

      storage.setTokens(
        response.data.accessToken,
        response.data.refreshToken
      );

      set({
        user: response.data.user,
        isAuthenticated: true,
        loading: false,
        initialized: true,
      });
    } catch (error) {
      storage.clear();

      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        initialized: true,
      });

      throw error;
    }
  },

  async register(payload) {
    set({
      loading: true,
    });

    try {
      const response = await authService.register(payload);

      storage.setTokens(
        response.data.accessToken,
        response.data.refreshToken
      );

      set({
        user: response.data.user,
        isAuthenticated: true,
        loading: false,
        initialized: true,
      });
    } catch (error) {
      storage.clear();

      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        initialized: true,
      });

      throw error;
    }
  },

  async loadUser() {
    try {
      const response = await authService.me();

      set({
        user: response.data,
        isAuthenticated: true,
        initialized: true,
      });
    } catch {
      storage.clear();

      set({
        user: null,
        isAuthenticated: false,
        initialized: true,
      });
    }
  },

  logout() {
    storage.clear();

    authService.logout();

    set({
      user: null,
      isAuthenticated: false,
      loading: false,
      initialized: true,
    });
  },
}));