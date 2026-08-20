export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  plan?: string;
}


export interface LoginResponse {
  success: boolean;

  data: {
    user: User;
    accessToken: string;
  };
}