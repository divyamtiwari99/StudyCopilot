import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  FileText,
  Layers3,
  NotebookPen,
  Sparkles,
} from "lucide-react";

const actions = [
  {
    title: "Ask AI",
    subtitle: "Start a new AI conversation",
    icon: BrainCircuit,
    path: "/dashboard/chat",
  },
  {
    title: "Upload Document",
    subtitle: "Add new study material",
    icon: FileText,
    path: "/dashboard/documents",
  },
  {
    title: "Generate Notes",
    subtitle: "Create structured notes",
    icon: NotebookPen,
    path: "/dashboard/notes",
  },
  {
    title: "Create Quiz",
    subtitle: "Test your knowledge",
    icon: BookOpen,
    path: "/dashboard/quiz",
  },
  {
    title: "Flashcards",
    subtitle: "Quick revision cards",
    icon: Layers3,
    path: "/dashboard/flashcards",
  },
];

export default function AICommandCenter() {
  const navigate = useNavigate();

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        p-6
        backdrop-blur-xl
        transition-all
        duration-300
        sm:p-7
      "
      style={{
        background:
          "color-mix(in srgb,var(--surface) 96%,transparent)",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          blur-3xl
          opacity-10
        "
        style={{
          background: "var(--accent-color)",
        }}
      />

      <div className="relative z-10 mb-7">
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
          "
          style={{
            color: "var(--accent-color)",
            background:
              "color-mix(in srgb,var(--accent-color) 10%,transparent)",
            borderColor:
              "color-mix(in srgb,var(--accent-color) 20%,transparent)",
          }}
        >
          <Sparkles size={15} />
          Quick Actions
        </div>

        <h2
          className="
            mt-5
            text-2xl
            font-bold
            tracking-tight
            lg:text-3xl
          "
          style={{
            color: "var(--text)",
          }}
        >
          What would you like to do?
        </h2>

        <p
          className="
            mt-2
            text-sm
          "
          style={{
            color: "var(--muted)",
          }}
        >
          Jump directly into your next learning task.
        </p>
      </div>

      <div
        className="
          relative
          z-10
          grid
          gap-4
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              type="button"
              onClick={() =>
                navigate(action.path)
              }
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                p-5
                text-left
                transition-all
                duration-300
                hover:-translate-y-1
              "
              style={{
                background:
                  "color-mix(in srgb,var(--surfaceHover) 42%,transparent)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-card)",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.borderColor =
                  "color-mix(in srgb,var(--accent-color) 40%,var(--border))";
                event.currentTarget.style.boxShadow =
                  "var(--shadow-hover)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.borderColor =
                  "var(--border)";
                event.currentTarget.style.boxShadow =
                  "var(--shadow-card)";
              }}
            >
              {/* Card glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-10
                  -top-10
                  h-24
                  w-24
                  rounded-full
                  blur-2xl
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover:opacity-20
                "
                style={{
                  background:
                    "var(--accent-color)",
                }}
              />

              <div
                className="
                  relative
                  z-10
                  flex
                  items-center
                  justify-between
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    transition-all
                    duration-300
                    group-hover:scale-110
                    group-hover:-rotate-2
                  "
                  style={{
                    background:
                      "color-mix(in srgb,var(--accent-color) 10%,transparent)",
                    borderColor:
                      "color-mix(in srgb,var(--accent-color) 20%,var(--border))",
                  }}
                >
                  <Icon
                    size={22}
                    style={{
                      color:
                        "var(--accent-color)",
                    }}
                  />
                </div>

                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                  "
                  style={{
                    borderColor:
                      "var(--border)",
                    backgroundColor:
                      "var(--surface)",
                    color: "var(--muted)",
                  }}
                >
                  <ArrowRight size={17} />
                </span>
              </div>

              <h3
                className="
                  relative
                  z-10
                  mt-5
                  text-base
                  font-semibold
                "
                style={{
                  color: "var(--text)",
                }}
              >
                {action.title}
              </h3>

              <p
                className="
                  relative
                  z-10
                  mt-2
                  text-sm
                  leading-6
                "
                style={{
                  color: "var(--muted)",
                }}
              >
                {action.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}