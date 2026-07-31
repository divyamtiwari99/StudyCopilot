import { useAuthStore } from "../../../store/auth.store";

export function useLogin() {
  const login = useAuthStore(
    (state) => state.login
  );

  const loading = useAuthStore(
    (state) => state.loading
  );

  return {
    login,
    loading,
  };
}