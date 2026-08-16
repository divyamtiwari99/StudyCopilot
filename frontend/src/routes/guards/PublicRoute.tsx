import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({
  children,
}: PublicRouteProps) {
  const { initialized, isAuthenticated } = useAuthStore();

  if (!initialized) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{
          background: "var(--background)",
          color: "var(--text)",
        }}
      >
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"
          style={{ borderColor: "var(--border)", borderTopColor: "var(--accent-color)" }}
        />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}