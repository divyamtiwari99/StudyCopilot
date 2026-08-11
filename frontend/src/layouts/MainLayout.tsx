import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div
      className="
        min-h-screen
        text-white
      "
      style={{
        backgroundColor:
          "var(--app-background,#0f172a)",
      }}
    >
      <Outlet />
    </div>
  );
}