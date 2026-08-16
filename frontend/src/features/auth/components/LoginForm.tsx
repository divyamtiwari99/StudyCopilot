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

function getAuthErrorMessage(error: unknown, fallback: string) {
  if (typeof error === "object" && error !== null) {
    const response = (error as { response?: { data?: { message?: unknown } } }).response;
    const message = response?.data?.message;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return fallback;
}

export default function LoginForm() {
  const navigate = useNavigate();

  const login = useAuthStore(
    (state) => state.login
  );

  const loading = useAuthStore(
    (state) => state.loading
  );

  const [serverError, setServerError] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(
    data: LoginSchema
  ) {
    try {
      setServerError("");

      await login({
        email: data.email,
        password: data.password,
      });

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error: unknown) {
      setServerError(
        getAuthErrorMessage(error, "Invalid email or password.")
      );
    }
  }

  return (
  <div className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-8 backdrop-blur-3xl">

      <div className="mb-8 flex flex-col items-center text-center">

        <img
          src="/logo.png"
          alt="StudyCopilot Logo"
          className="mb-5 h-20 w-20 rounded-3xl object-contain"
        />

        <h1 className="text-4xl font-bold text-[var(--text)]">
          Welcome Back
        </h1>

        <p className="mt-2 text-[var(--muted)]">
          Sign in to continue using
          StudyCopilot.
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
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surfaceHover)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-[var(--accent-color)]"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-700">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surfaceHover)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-[var(--accent-color)]"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-700">
              {errors.password.message}
            </p>
          )}
        </div>

        {serverError && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-[var(--accent-color)] py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Signing In..."
            : "Sign In"}
        </button>

        <p className="text-center text-sm text-[var(--muted)]">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-[var(--accent-color)] hover:text-[var(--accent-color)]"
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}