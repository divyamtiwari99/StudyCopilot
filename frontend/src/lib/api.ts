import axios from "axios";
import storage from "./storage";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    "https://studycopilot-production-529e.up.railway.app/api",
  withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    const token = storage.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.clear();

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("studycopilot:unauthorized"),
        );
      }
    }

    return Promise.reject(error);
  }
);