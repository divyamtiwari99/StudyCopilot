import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black" />

      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />

      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">
        <Outlet />
      </div>
    </main>
  );
}