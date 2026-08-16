import {
  ArrowRight,
  BookOpen,
  Brain,
  FileText,
  Layers3,
  Sparkles,
} from "lucide-react";

interface Props {
  onQuestion: (
    question: string,
  ) => void;
}

const actions = [
  {
    icon: BookOpen,
    title: "Summarize",
    description:
      "Generate a complete study summary.",
    prompt:
      "Summarize this document.",
  },
  {
    icon: Brain,
    title: "Explain",
    description:
      "Explain the important concepts.",
    prompt:
      "Explain the main concepts in simple language.",
  },
  {
    icon: Layers3,
    title: "Flashcards",
    description:
      "Create revision flashcards.",
    prompt:
      "Generate flashcards from this document.",
  },
  {
    icon: FileText,
    title: "Notes",
    description:
      "Generate study notes.",
    prompt:
      "Create revision notes.",
  },
];

export default function ChatEmptyState({
  onQuestion,
}: Props) {
  return (
    <div
      className="
        flex
        h-full
        items-center
        justify-center
        px-6
        py-10
        sm:px-8
      "
    >
      <div className="w-full max-w-4xl">
        {/* Hero */}

        <div className="text-center">
          <div
            className="
              group
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              border
              transition-all
              duration-300
              hover:-translate-y-1
              hover:scale-105
            "
            style={{
              background:
                "color-mix(in srgb,var(--accent-color) 10%,var(--surface))",

              borderColor:
                "color-mix(in srgb,var(--accent-color) 22%,var(--border))",

              boxShadow:
                "0 12px 30px color-mix(in srgb,var(--accent-color) 10%,transparent)",
            }}
          >
            <Sparkles
              size={30}
              strokeWidth={1.8}
              className="
                transition-transform
                duration-500
                group-hover:rotate-12
              "
              style={{
                color:
                  "var(--accent-color)",
              }}
            />
          </div>

          <h1
            className="
              mt-5
              text-3xl
              font-bold
              tracking-tight
              sm:text-4xl
            "
            style={{
              color:
                "var(--text)",
            }}
          >
            Welcome to StudyCopilot
          </h1>

          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              text-base
              leading-7
            "
            style={{
              color:
                "var(--muted)",
            }}
          >
            Ask questions, create
            summaries, notes, quizzes
            and learn faster with AI.
          </p>
        </div>

        {/* Quick actions */}

        <div
          className="
            mt-10
            grid
            gap-4
            md:grid-cols-2
          "
        >
          {actions.map(
            (action) => {
              const Icon =
                action.icon;

              return (
                <button
                  type="button"
                  key={action.title}
                  onClick={() =>
                    onQuestion(
                      action.prompt,
                    )
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
                      "var(--surface)",

                    borderColor:
                      "var(--border)",

                    boxShadow:
                      "var(--shadow-card)",
                  }}
                  onMouseEnter={(
                    event,
                  ) => {
                    event.currentTarget.style.borderColor =
                      "color-mix(in srgb,var(--accent-color) 30%,var(--border))";

                    event.currentTarget.style.background =
                      "color-mix(in srgb,var(--accent-color) 6%,var(--surface))";

                    event.currentTarget.style.boxShadow =
                      "var(--shadow-hover)";
                  }}
                  onMouseLeave={(
                    event,
                  ) => {
                    event.currentTarget.style.borderColor =
                      "var(--border)";

                    event.currentTarget.style.background =
                      "var(--surface)";

                    event.currentTarget.style.boxShadow =
                      "var(--shadow-card)";
                  }}
                >
                  {/* Accent glow */}

                  <span
                    className="
                      pointer-events-none
                      absolute
                      -right-12
                      -top-12
                      h-28
                      w-28
                      rounded-full
                      blur-3xl
                      opacity-0
                      transition-opacity
                      duration-500
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
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        border
                        transition-all
                        duration-300
                        group-hover:scale-105
                      "
                      style={{
                        background:
                          "color-mix(in srgb,var(--accent-color) 10%,transparent)",

                        borderColor:
                          "color-mix(in srgb,var(--accent-color) 18%,var(--border))",
                      }}
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.9}
                        className="
                          transition-transform
                          duration-300
                          group-hover:scale-110
                        "
                        style={{
                          color:
                            "var(--accent-color)",
                        }}
                      />
                    </div>

                    <ArrowRight
                      size={18}
                      className="
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                      "
                      style={{
                        color:
                          "var(--muted)",
                      }}
                    />
                  </div>

                  <div className="relative z-10">
                    <h3
                      className="
                        mt-4
                        text-lg
                        font-semibold
                      "
                      style={{
                        color:
                          "var(--text)",
                      }}
                    >
                      {action.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-sm
                        leading-6
                      "
                      style={{
                        color:
                          "var(--muted)",
                      }}
                    >
                      {action.description}
                    </p>
                  </div>
                </button>
              );
            },
          )}
        </div>

        {/* Tip */}

        <div
          className="
            mt-8
            rounded-2xl
            border
            px-5
            py-4
            transition-all
            duration-300
            hover:-translate-y-0.5
          "
          style={{
            background:
              "color-mix(in srgb,var(--accent-color) 7%,var(--surface))",

            borderColor:
              "color-mix(in srgb,var(--accent-color) 20%,var(--border))",

            boxShadow:
              "var(--shadow-card)",
          }}
        >
          <p
            className="
              text-sm
              leading-6
            "
            style={{
              color:
                "var(--muted)",
            }}
          >
            💡 Try asking:
            <span
              className="
                font-medium
              "
              style={{
                color:
                  "var(--text)",
              }}
            >
              {" "}
              "Explain Binary Search
              with an example"
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}