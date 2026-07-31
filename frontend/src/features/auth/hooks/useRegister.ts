import { useAuthStore } from "../../../store/auth.store";

export function useRegister() {
  const register = useAuthStore(
    (state) => state.register
  );

  const loading = useAuthStore(
    (state) => state.loading
  );

  return {
    register,
    loading,
  };
}