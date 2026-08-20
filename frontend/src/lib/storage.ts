const ACCESS_TOKEN_KEY = "studycopilot_access_token";

const storage = {
  setAccessToken(accessToken: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  },

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  clear() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const encoded = encodeURIComponent(name) + "=";
  const match = document.cookie.split("; ").find((part) => part.startsWith(encoded));
  return match ? decodeURIComponent(match.slice(encoded.length)) : null;
}

export default storage;
