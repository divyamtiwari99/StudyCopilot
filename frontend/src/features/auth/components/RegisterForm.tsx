import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterSchema,
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

export default function RegisterForm() {
  const navigate = useNavigate();

  const registerUser = useAuthStore(
    (state) => state.register
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
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(
    data: RegisterSchema
  ) {
    try {
      setServerError("");

      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      navigate("/dashboard");
    } catch (error: unknown) {
      setServerError(
        getAuthErrorMessage(error, "Registration failed.")
      );
    }
  }

  return (
    <div className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-8 backdrop-blur-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[var(--text)]">
          Create Account
        </h1>

        <p className="mt-2 text-[var(--muted)]">
          Start your AI learning journey.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <input
            {...register("name")}
            placeholder="Full Name"
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surfaceHover)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-[var(--accent-color)]"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-700">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
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
            {...register("password")}
            placeholder="Password"
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surfaceHover)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-[var(--accent-color)]"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-700">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surfaceHover)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-[var(--accent-color)]"
          />

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-700">
              {errors.confirmPassword.message}
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
            ? "Creating..."
            : "Create Account"}
        </button>

        <div className="pt-2 text-center">
          <p className="text-sm text-[var(--muted)]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-[var(--accent-color)] transition hover:text-[var(--accent-color)]"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}