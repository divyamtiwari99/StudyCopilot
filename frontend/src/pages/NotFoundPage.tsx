import { Link } from "react-router-dom";

import {
  ArrowLeft,
  Compass,
} from "lucide-react";

export default function NotFoundPage() {
  return (
    <main
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        px-6
      "
      style={{
        background:
          "var(--background)",

        color:
          "var(--text)",
      }}
    >
      {/* Ambient glow */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-96
          w-96
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          opacity-20
          blur-[120px]
        "
        style={{
          background:
            "var(--accent-color)",
        }}
      />

      {/* Content */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-lg
          rounded-[32px]
          border
          p-10
          text-center
          backdrop-blur-2xl
        "
        style={{
          background:
            "var(--surface)",

          borderColor:
            "var(--border)",

          boxShadow:
            "var(--shadow-card)",
        }}
      >
        {/* Icon */}

        <div
          className="
            mx-auto
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            border
          "
          style={{
            background:
              "color-mix(in srgb,var(--accent-color) 10%,transparent)",

            borderColor:
              "color-mix(in srgb,var(--accent-color) 20%,var(--border))",

            color:
              "var(--accent-color)",

            boxShadow:
              "0 12px 30px color-mix(in srgb,var(--accent-color) 10%,transparent)",
          }}
        >
          <Compass
            size={30}
            strokeWidth={1.8}
          />
        </div>

        {/* 404 */}

        <p
          className="
            mt-7
            text-sm
            font-semibold
            uppercase
            tracking-[0.3em]
          "
          style={{
            color:
              "var(--accent-color)",
          }}
        >
          Error 404
        </p>

        <h1
          className="
            mt-3
            text-6xl
            font-bold
            tracking-tight
          "
          style={{
            color:
              "var(--text)",
          }}
        >
          Page not found
        </h1>

        <p
          className="
            mx-auto
            mt-4
            max-w-sm
            text-sm
            leading-6
          "
          style={{
            color:
              "var(--muted)",
          }}
        >
          The page you're looking for
          doesn't exist or may have been
          moved to another location.
        </p>

        {/* Action */}

        <Link
          to="/"
          className="
            group
            mt-8
            inline-flex
            items-center
            gap-2
            rounded-2xl
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition-all
            duration-200
            hover:-translate-y-0.5
            active:translate-y-0
          "
          style={{
            background:
              "var(--accent-color)",

            boxShadow:
              "0 10px 28px color-mix(in srgb,var(--accent-color) 22%,transparent)",
          }}
        >
          <ArrowLeft
            size={17}
            className="
              transition-transform
              duration-200
              group-hover:-translate-x-0.5
            "
          />

          Go Home
        </Link>
      </div>
    </main>
  );
}