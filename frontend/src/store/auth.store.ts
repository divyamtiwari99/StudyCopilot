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
  login(payload: LoginPayload): Promise<void>;
  register(payload: RegisterPayload): Promise<void>;
  logout(): Promise<void>;
  loadUser(): Promise<void>;
  updateUser(user: Partial<User>): void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  initialized: false,

  async login(payload) {
    set({ loading: true });

    try {
      const response = await authService.login(payload);

      storage.setAccessToken(response.data.accessToken);

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
    set({ loading: true });

    try {
      const response = await authService.register(payload);

      storage.setAccessToken(response.data.accessToken);

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
    set({ loading: true });

    try {
      const response = await authService.me();

      set({
        user: response.data,
        isAuthenticated: true,
        loading: false,
        initialized: true,
      });
    } catch (error) {
      // A 401 means the token is invalid/expired. Network failures should
      // still release the router from the bootstrap spinner.
      if (error instanceof Error) {
        console.warn("Unable to restore StudyCopilot session:", error.message);
      }

      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        initialized: true,
      });
    }
  },

  updateUser(user) {
    set((state) => ({
      user: state.user ? { ...state.user, ...user } : null,
    }));
  },

  async logout() {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      storage.clear();
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        initialized: true,
      });
    }
  },
}));

if (typeof window !== "undefined") {
  window.addEventListener("studycopilot:unauthorized", () => {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      loading: false,
      initialized: true,
    });
  });
}
