import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import storage, { getCookie } from "./storage";

function resolveApiBaseUrl(): string {
  const configured = import.meta.env.VITE_API_URL?.trim();

  if (configured) {
    const normalized = configured.replace(/\/$/, "");
    return normalized.endsWith("/api")
      ? normalized
      : `${normalized}/api`;
  }

  if (typeof window !== "undefined") {
    const { hostname, protocol } = window.location;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return `${protocol}//${hostname}:5000/api`;
    }
  }

  return "/api";
}


export function getApiErrorMessage(error: unknown, fallback = "Something went wrong. Please try again."): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: unknown; code?: unknown } | undefined;
    if (typeof data?.message === "string" && data.message.trim()) return data.message;
    if (data?.code === "app_rate_limit") return "Too many requests. Please wait a moment and try again.";
    if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") return "The request timed out. Please try again.";
    if (!error.response) return "Unable to reach StudyCopilot. Check your connection and try again.";
  }
  if (error instanceof Error && error.message.trim()) return error.message;
  return fallback;
}

export const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  withCredentials: true,
  timeout: 120_000,
  headers: { Accept: "application/json" },
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const csrf = getCookie("studycopilot_csrf");
  if (!csrf) return null;

  if (!refreshPromise) {
    refreshPromise = axios
      .post<{ success: boolean; data?: { accessToken: string } }>(
        `${resolveApiBaseUrl()}/auth/refresh`,
        {},
        {
          timeout: 15_000,
          withCredentials: true,
          headers: { Accept: "application/json", "X-StudyCopilot-CSRF": csrf },
        },
      )
      .then((response) => {
        const accessToken = response.data.data?.accessToken;
        if (!accessToken) return null;
        storage.setAccessToken(accessToken);
        return accessToken;
      })
      .catch(() => null)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

api.interceptors.request.use(
  (config) => {
    const token = storage.getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    const csrf = getCookie("studycopilot_csrf");
    if (csrf) config.headers["X-StudyCopilot-CSRF"] = csrf;
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

    if (
      error.response?.status === 401 &&
      original &&
      !original._retry &&
      !original.url?.includes("/auth/refresh") &&
      Boolean(getCookie("studycopilot_csrf"))
    ) {
      original._retry = true;
      const accessToken = await refreshAccessToken();

      if (accessToken) {
        original.headers.Authorization = `Bearer ${accessToken}`;
        return api.request(original);
      }
    }

    if (error.response?.status === 401) {
      storage.clear();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("studycopilot:unauthorized"));
      }
    }

    return Promise.reject(error);
  },
);
