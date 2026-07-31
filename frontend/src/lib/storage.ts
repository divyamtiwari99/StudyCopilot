const ACCESS_TOKEN =
  "studycopilot_access_token";

const REFRESH_TOKEN =
  "studycopilot_refresh_token";

export const storage = {
  setTokens(
    accessToken: string,
    refreshToken: string
  ) {
    localStorage.setItem(
      ACCESS_TOKEN,
      accessToken
    );

    localStorage.setItem(
      REFRESH_TOKEN,
      refreshToken
    );
  },

  getAccessToken() {
    return localStorage.getItem(
      ACCESS_TOKEN
    );
  },

  getRefreshToken() {
    return localStorage.getItem(
      REFRESH_TOKEN
    );
  },

  clear() {
    localStorage.removeItem(
      ACCESS_TOKEN
    );

    localStorage.removeItem(
      REFRESH_TOKEN
    );
  },
};

export default storage;