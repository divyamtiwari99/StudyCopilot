import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  type LoginSchema,
} from "../schemas/auth.schema";

import { useAuthStore } from "../../../store/auth.store";

export default function LoginForm() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginSchema) {
    try {
      setServerError("");

      console.log("========== LOGIN START ==========");
      console.log("Current Path:", window.location.pathname);

      await login({
        email: data.email,
        password: data.password,
      });

      console.log("✅ Login Success");
      console.log(
        "Current Path Before Navigate:",
        window.location.pathname
      );

      navigate("/dashboard", {
        replace: true,
      });

      setTimeout(() => {
        console.log(
          "Current Path After Navigate:",
          window.location.pathname
        );
        console.log("========== LOGIN END ==========");
      }, 100);
    } catch (error: any) {
      console.error("❌ Login Error:", error);

      setServerError(
        error?.response?.data?.message ??
          "Invalid email or password."
      );
    }
  }

  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mt-2 text-zinc-400">
          Sign in to continue using StudyCopilot.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-violet-500"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-violet-500"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {serverError && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className="pt-2 text-center">
          <p className="text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-violet-400 transition hover:text-violet-300"
            >
              Create one
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}