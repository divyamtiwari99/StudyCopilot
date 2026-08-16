import { useNavigate } from "react-router-dom";

import {
  BookOpen,
  Brain,
  CheckCircle2,
  Clock3,
  FileText,
  Layers3,
  NotebookPen,
  Sparkles,
} from "lucide-react";

interface Props {
  title: string;
  pages: number;
  size: string;
  status: string;

  contentId: string;
}

const actions = [
  {
    icon: BookOpen,
    title: "Summary",
    subtitle: "Generate overview",
  },
  {
    icon: NotebookPen,
    title: "Notes",
    subtitle: "Revision ready",
  },
  {
    icon: Brain,
    title: "Quiz",
    subtitle: "Test yourself",
  },
  {
    icon: Layers3,
    title: "Flashcards",
    subtitle: "Quick revision",
  },
];

export default function DocumentSidebar({
  title,
  pages,
  size,
  status,
  contentId,
}: Props) {
  const navigate = useNavigate();

  const statusConfig = {
    ready: { label: "AI Ready", color: "var(--success)" },
    completed: { label: "AI Ready", color: "var(--success)" },
    processing: { label: "Processing", color: "var(--warning)" },
    uploading: { label: "Uploading", color: "var(--info)" },
    failed: { label: "Failed", color: "var(--danger)" },
  } as const;

  const normalizedStatus = status.toLowerCase();
  const statusInfo =
    statusConfig[normalizedStatus as keyof typeof statusConfig] ??
    { label: status, color: "var(--muted)" };

  const readingTime = pages > 0
    ? `${Math.max(1, Math.ceil(pages * 2.2))} min`
    : "--";

  return (
    <aside className="space-y-5">
      {/* Document */}

      <div
        className="
          group
          relative
          overflow-hidden
          rounded-[24px]
          border
          p-6
          backdrop-blur-xl
          transition-all
          duration-300
          hover:-translate-y-0.5
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
        {/* Accent glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-14
            -top-14
            h-32
            w-32
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
            h-[72px]
            w-[72px]
            items-center
            justify-center
            rounded-3xl
            border
            transition-all
            duration-300
            group-hover:scale-105
          "
          style={{
            background:
              "color-mix(in srgb,var(--accent-color) 10%,transparent)",

            borderColor:
              "color-mix(in srgb,var(--accent-color) 20%,var(--border))",

            color:
              "var(--accent-color)",
          }}
        >
          <FileText
            size={30}
            strokeWidth={1.8}
          />
        </div>

        <h2
          className="
            relative
            z-10
            mt-5
            line-clamp-2
            text-2xl
            font-bold
            leading-tight
            tracking-tight
          "
          style={{
            color:
              "var(--text)",
          }}
          title={title}
        >
          {title}
        </h2>

        <div
          className="
            relative
            z-10
            mt-5
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
            color:
              statusInfo.color,

            background:
              `color-mix(in srgb,${statusInfo.color} 9%,transparent)`,

            borderColor:
              `color-mix(in srgb,${statusInfo.color} 22%,var(--border))`,
          }}
        >
          <CheckCircle2 size={16} />

          {statusInfo.label}
        </div>
      </div>

      {/* Insights */}

      <div
        className="
          rounded-[24px]
          border
          p-6
          backdrop-blur-xl
          transition-all
          duration-300
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
        <div className="mb-6 flex items-center gap-2">
          <Sparkles
            size={18}
            style={{
              color:
                "var(--accent-color)",
            }}
          />

          <h3
            className="font-semibold"
            style={{
              color:
                "var(--text)",
            }}
          >
            Document Insights
          </h3>
        </div>

        <div className="space-y-5">
          {/* Pages */}

          <div className="flex items-center justify-between gap-4">
            <span
              className="text-sm"
              style={{
                color:
                  "var(--muted)",
              }}
            >
              Pages
            </span>

            <span
              className="font-medium"
              style={{
                color:
                  "var(--text)",
              }}
            >
              {pages || "--"}
            </span>
          </div>

          {/* Size */}

          <div className="flex items-center justify-between gap-4">
            <span
              className="text-sm"
              style={{
                color:
                  "var(--muted)",
              }}
            >
              Size
            </span>

            <span
              className="font-medium"
              style={{
                color:
                  "var(--text)",
              }}
            >
              {size}
            </span>
          </div>

          {/* Reading Time */}

          <div className="flex items-center justify-between gap-4">
            <span
              className="text-sm"
              style={{
                color:
                  "var(--muted)",
              }}
            >
              Reading Time
            </span>

            <span
              className="
                flex
                items-center
                gap-2
                text-sm
                font-medium
              "
              style={{
                color:
                  "var(--text)",
              }}
            >
              <Clock3
                size={15}
                style={{
                  color:
                    "var(--muted)",
                }}
              />

              {readingTime}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}

      <div>
        <h3
          className="
            mb-4
            text-xs
            font-semibold
            uppercase
            tracking-[0.25em]
          "
          style={{
            color:
              "var(--muted)",
          }}
        >
          Quick Actions
        </h3>

        <div className="space-y-3">
          {actions.map(
            (action) => {
              const Icon =
                action.icon;

              return (
                <button
                  key={action.title}
                  type="button"
                  onClick={() => {
                    const tabMap: Record<string, string> = {
                      Summary: "summary",
                      Notes: "notes",
                      Quiz: "quiz",
                      Flashcards: "flashcards",
                    };

                    const tab = tabMap[action.title];

                    if (tab) {
                      navigate(
                        `/dashboard/workspace/${contentId}?tab=${tab}`,
                      );
                    }
                  }}
                  className="
                    group
                    relative
                    flex
                    w-full
                    items-center
                    gap-4
                    overflow-hidden
                    rounded-2xl
                    border
                    px-4
                    py-4
                    text-left
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                  "
                  style={{
                    background:
                      "var(--surfaceHover)",

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
                      "color-mix(in srgb,var(--accent-color) 7%,var(--surfaceHover))";

                    event.currentTarget.style.boxShadow =
                      "var(--shadow-hover)";
                  }}
                  onMouseLeave={(
                    event,
                  ) => {
                    event.currentTarget.style.borderColor =
                      "var(--border)";

                    event.currentTarget.style.background =
                      "var(--surfaceHover)";

                    event.currentTarget.style.boxShadow =
                      "var(--shadow-card)";
                  }}
                >
                  {/* Hover glow */}

                  <span
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
                      h-12
                      w-12
                      shrink-0
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

                  <div className="relative z-10 min-w-0 flex-1">
                    <p
                      className="font-medium"
                      style={{
                        color:
                          "var(--text)",
                      }}
                    >
                      {action.title}
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                      "
                      style={{
                        color:
                          "var(--muted)",
                      }}
                    >
                      {action.subtitle}
                    </p>
                  </div>

                  <Sparkles
                    size={15}
                    className="
                      relative
                      z-10
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:translate-x-0
                      group-hover:opacity-60
                    "
                    style={{
                      color:
                        "var(--accent-color)",
                    }}
                  />
                </button>
              );
            },
          )}
        </div>
      </div>
    </aside>
  );
}