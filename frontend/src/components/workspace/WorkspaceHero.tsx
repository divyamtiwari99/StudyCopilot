import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  BrainCircuit,
  Sparkles,
  Upload,
} from "lucide-react";

import Button from "../ui/Button";
import { useAuthStore } from "@/store/auth.store";

export default function WorkspaceHero() {
  const navigate = useNavigate();

  const user = useAuthStore(
    (state) => state.user,
  );

  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning";
    }

    if (hour < 18) {
      return "Good Afternoon";
    }

    return "Good Evening";
  }, []);

  return (
    <section
      className="
        group
        relative
        overflow-hidden
        rounded-[32px]
        border
        backdrop-blur-3xl
        transition-all
        duration-500
        hover:-translate-y-1
      "
      style={{
        background:
          "color-mix(in srgb,var(--surface),transparent 8%)",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      {/* Ambient accent glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-24
          -top-24
          h-72
          w-72
          rounded-full
          blur-3xl
          opacity-25
          transition-opacity
          duration-500
          group-hover:opacity-40
        "
        style={{
          background: "var(--accent-color)",
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -right-20
          h-72
          w-72
          rounded-full
          blur-3xl
          opacity-10
          transition-opacity
          duration-500
          group-hover:opacity-20
        "
        style={{
          background: "var(--accent-color)",
        }}
      />

      {/* Subtle inner gradient */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at top left,color-mix(in srgb,var(--accent-color) 12%,transparent),transparent 45%)",
        }}
      />

      {/* Decorative grid */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
        "
        style={{
          backgroundImage:
            "linear-gradient(var(--text) 1px,transparent 1px),linear-gradient(90deg,var(--text) 1px,transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div
        className="
          relative
          z-10
          p-6
          sm:p-8
          lg:p-10
        "
      >
        {/* Badge */}
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            px-4
            py-2
            text-sm
            font-semibold
            shadow-sm
          "
          style={{
            color: "var(--accent-color)",
            background:
              "color-mix(in srgb,var(--accent-color) 10%,transparent)",
            borderColor:
              "color-mix(in srgb,var(--accent-color) 20%,transparent)",
          }}
        >
          <span
            className="
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
            "
            style={{
              background:
                "color-mix(in srgb,var(--accent-color) 14%,transparent)",
            }}
          >
            <Sparkles size={13} />
          </span>

          Dashboard
        </div>

        {/* Heading */}
        <h1
          className="
            mt-6
            max-w-4xl
            text-4xl
            font-black
            tracking-tight
            sm:text-5xl
            lg:text-6xl
            lg:leading-[1.05]
          "
          style={{
            color: "var(--text)",
          }}
        >
          {greeting}{" "}
          {user?.name ?? ""} 👋
        </h1>

        <p
          className="
            mt-5
            max-w-3xl
            text-base
            leading-7
            sm:text-lg
            sm:leading-8
          "
          style={{
            color: "var(--muted)",
          }}
        >
          Ready to continue learning? Upload new
          material or continue chatting with your
          existing documents.
        </p>

        {/* Actions */}
        <div
          className="
            mt-8
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:flex-wrap
            sm:gap-4
          "
        >
          <Button
            size="lg"
            className="
              gap-3
              shadow-lg
              transition-transform
              duration-200
              hover:-translate-y-0.5
            "
            onClick={() =>
              navigate("/dashboard/documents")
            }
          >
            <Upload size={20} />
            Upload Document
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="
              gap-3
              transition-transform
              duration-200
              hover:-translate-y-0.5
            "
            onClick={() =>
              navigate("/dashboard/chat")
            }
          >
            <BrainCircuit size={20} />
            Continue Chat
            <ArrowRight
              size={18}
              className="
                transition-transform
                duration-200
                group-hover:translate-x-0.5
              "
            />
          </Button>
        </div>

        {/* Quick value strip */}
        <div
          className="
            mt-8
            flex
            flex-wrap
            items-center
            gap-x-5
            gap-y-2
            border-t
            pt-5
          "
          style={{
            borderColor:
              "color-mix(in srgb,var(--border) 75%,transparent)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor:
                  "var(--accent-color)",
              }}
            />

            <span
              className="text-xs font-medium"
              style={{
                color: "var(--muted)",
              }}
            >
              AI-powered learning
            </span>
          </div>

          <span
            className="hidden h-1 w-1 rounded-full sm:block"
            style={{
              backgroundColor: "var(--border)",
            }}
          />

          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor:
                  "var(--accent-color)",
              }}
            />

            <span
              className="text-xs font-medium"
              style={{
                color: "var(--muted)",
              }}
            >
              Documents, notes & quizzes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}