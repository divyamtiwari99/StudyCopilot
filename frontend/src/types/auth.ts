export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface LoginResponse {
  success: boolean;

  data: {
    user: User;

    accessToken: string;

    refreshToken: string;
  };
}