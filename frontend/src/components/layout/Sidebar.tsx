import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  FileText,
  BrainCircuit,
  NotebookPen,
  Brain,
  Layers3,
  Settings,
  CalendarDays,
  HardDrive,
  ChevronRight,
} from "lucide-react";

const workspace = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Library",
    path: "/dashboard/documents",
    icon: FileText,
  },
  {
    title: "AI Tutor",
    path: "/dashboard/chat",
    icon: BrainCircuit,
  },
];

const aiTools = [
  {
    title: "Study Planner",
    path: "/dashboard/study-planner",
    icon: CalendarDays,
  },
  {
    title: "Notes",
    path: "/dashboard/notes",
    icon: NotebookPen,
  },
  {
    title: "Quiz",
    path: "/dashboard/quiz",
    icon: Brain,
  },
  {
    title: "Flashcards",
    path: "/dashboard/flashcards",
    icon: Layers3,
  },
];

type NavItem = typeof workspace[number];

function NavSection({
  title,
  items,
}: {
  title: string;
  items: NavItem[];
}) {
  return (
    <section aria-label={title}>
      <div className="mb-3 flex items-center gap-2 px-3">
        <span
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.22em]
          "
          style={{
            color: "var(--muted)",
          }}
        >
          {title}
        </span>

        <span
          className="h-px flex-1"
          style={{
            backgroundColor:
              "color-mix(in srgb,var(--border) 70%,transparent)",
          }}
        />
      </div>

      <div className="space-y-1.5">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              end={item.path === "/dashboard"}
              aria-label={item.title}
              className="
                group
                relative
                flex
                min-h-[52px]
                items-center
                gap-3
                overflow-hidden
                rounded-2xl
                border
                px-3
                text-sm
                font-medium
                outline-none
                transition-all
                duration-200
                ease-out
                hover:-translate-y-[1px]
                focus-visible:ring-2
                focus-visible:ring-offset-2
              "
              style={({ isActive }) => ({
                background: isActive
                  ? "color-mix(in srgb,var(--accent-color) 10%,var(--surface))"
                  : "transparent",

                borderColor: isActive
                  ? "color-mix(in srgb,var(--accent-color) 22%,var(--border))"
                  : "transparent",

                color: isActive
                  ? "var(--text)"
                  : "var(--muted)",

                boxShadow: isActive
                  ? "0 8px 24px color-mix(in srgb,var(--accent-color) 7%,transparent)"
                  : "none",

                ["--tw-ring-color" as string]:
                  "color-mix(in srgb,var(--accent-color) 40%,transparent)",
              })}
            >
              {({ isActive }) => (
                <>
                  {/* Active indicator */}

                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      left-0
                      top-1/2
                      h-7
                      w-[3px]
                      -translate-y-1/2
                      rounded-r-full
                      transition-all
                      duration-200
                    "
                    style={{
                      opacity: isActive ? 1 : 0,
                      backgroundColor:
                        "var(--accent-color)",
                      boxShadow:
                        "0 0 12px color-mix(in srgb,var(--accent-color) 65%,transparent)",
                    }}
                  />

                  {/* Icon container */}

                  <span
                    className="
                      relative
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      transition-all
                      duration-200
                      group-hover:scale-[1.04]
                    "
                    style={{
                      backgroundColor: isActive
                        ? "color-mix(in srgb,var(--accent-color) 13%,transparent)"
                        : "transparent",
                    }}
                  >
                    <Icon
                      size={18}
                      strokeWidth={isActive ? 2.2 : 1.9}
                      className="
                        transition-transform
                        duration-200
                        group-hover:scale-105
                      "
                      style={{
                        color: isActive
                          ? "var(--accent-color)"
                          : "var(--muted)",
                      }}
                    />
                  </span>

                  {/* Label */}

                  <span className="min-w-0 flex-1 truncate">
                    {item.title}
                  </span>

                  {/* Arrow */}

                  <ChevronRight
                    size={15}
                    strokeWidth={1.8}
                    className="
                      -translate-x-1
                      opacity-0
                      transition-all
                      duration-200
                      group-hover:translate-x-0
                      group-hover:opacity-60
                    "
                    style={{
                      color: isActive
                        ? "var(--accent-color)"
                        : "var(--muted)",
                    }}
                  />
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </section>
  );
}

function SettingsLink() {
  return (
    <NavLink
      to="/dashboard/settings"
      aria-label="Settings"
      className="
        group
        relative
        flex
        min-h-[52px]
        items-center
        gap-3
        overflow-hidden
        rounded-2xl
        border
        px-3
        text-sm
        font-medium
        outline-none
        transition-all
        duration-200
        hover:-translate-y-[1px]
        focus-visible:ring-2
        focus-visible:ring-offset-2
      "
      style={({ isActive }) => ({
        background: isActive
          ? "color-mix(in srgb,var(--accent-color) 10%,var(--surface))"
          : "color-mix(in srgb,var(--surfaceHover) 55%,transparent)",

        borderColor: isActive
          ? "color-mix(in srgb,var(--accent-color) 22%,var(--border))"
          : "var(--border)",

        color: isActive
          ? "var(--text)"
          : "var(--muted)",

        boxShadow: isActive
          ? "0 8px 24px color-mix(in srgb,var(--accent-color) 7%,transparent)"
          : "none",

        ["--tw-ring-color" as string]:
          "color-mix(in srgb,var(--accent-color) 40%,transparent)",
      })}
    >
      {({ isActive }) => (
        <>
          {/* Active indicator */}

          <span
            aria-hidden="true"
            className="
              absolute
              left-0
              top-1/2
              h-7
              w-[3px]
              -translate-y-1/2
              rounded-r-full
            "
            style={{
              opacity: isActive ? 1 : 0,
              backgroundColor:
                "var(--accent-color)",
              boxShadow:
                "0 0 12px color-mix(in srgb,var(--accent-color) 65%,transparent)",
            }}
          />

          <span
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              transition-all
              duration-200
              group-hover:scale-105
            "
            style={{
              backgroundColor: isActive
                ? "color-mix(in srgb,var(--accent-color) 13%,transparent)"
                : "transparent",
            }}
          >
            <Settings
              size={18}
              strokeWidth={isActive ? 2.2 : 1.9}
              className="
                transition-transform
                duration-300
                group-hover:rotate-45
              "
              style={{
                color: isActive
                  ? "var(--accent-color)"
                  : "var(--muted)",
              }}
            />
          </span>

          <span className="flex-1">
            Settings
          </span>

          <ChevronRight
            size={15}
            strokeWidth={1.8}
            className="
              -translate-x-1
              opacity-0
              transition-all
              duration-200
              group-hover:translate-x-0
              group-hover:opacity-60
            "
            style={{
              color: isActive
                ? "var(--accent-color)"
                : "var(--muted)",
            }}
          />
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside
      aria-label="Main navigation"
      className="
        fixed
        left-4
        top-4
        bottom-4
        z-40
        flex
        w-[280px]
        flex-col
        overflow-y-auto
        overflow-x-hidden
        rounded-[30px]
        border
        backdrop-blur-2xl
        [&::-webkit-scrollbar]:hidden
      "
      style={{
        background:
          "color-mix(in srgb,var(--surface) 94%,transparent)",

        borderColor:
          "color-mix(in srgb,var(--border) 90%,transparent)",

        boxShadow:
          "0 24px 70px color-mix(in srgb,var(--text) 8%,transparent)",

        scrollbarWidth: "none",
      }}
    >
      {/* =========================================================
          BRAND
      ========================================================= */}

      <header
        className="
          group
          relative
          shrink-0
          overflow-hidden
          border-b
          px-5
          py-5
        "
        style={{
          borderColor: "var(--border)",
        }}
      >
        {/* Background glow */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-14
            -top-20
            h-36
            w-36
            rounded-full
            blur-3xl
            opacity-60
            transition-all
            duration-500
            group-hover:scale-125
            group-hover:opacity-90
          "
          style={{
            background:
              "color-mix(in srgb,var(--accent-color) 18%,transparent)",
          }}
        />

        <div className="relative flex items-center gap-3">
          {/* Logo */}

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              transition-all
              duration-300
              group-hover:scale-105
              group-hover:-rotate-1
            "
            style={{
              borderColor:
                "color-mix(in srgb,var(--accent-color) 25%,var(--border))",

              background:
                "color-mix(in srgb,var(--accent-color) 8%,var(--surface))",

              boxShadow:
                "0 8px 24px color-mix(in srgb,var(--accent-color) 10%,transparent)",
            }}
          >
            <img
              src="/logo.png"
              alt="StudyCopilot"
              className="
                h-9
                w-9
                rounded-xl
                object-contain
                transition-transform
                duration-300
                group-hover:scale-110
              "
            />
          </div>

          {/* Brand name */}

          <div className="min-w-0">
            <h1
              className="
                truncate
                text-[17px]
                font-bold
                tracking-tight
              "
              style={{
                color: "var(--text)",
              }}
            >
              StudyCopilot
            </h1>

            <div className="mt-1 flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor:
                    "var(--accent-color)",

                  boxShadow:
                    "0 0 8px color-mix(in srgb,var(--accent-color) 70%,transparent)",
                }}
              />

              <p
                className="text-[11px] font-medium"
                style={{
                  color: "var(--muted)",
                }}
              >
                Learning OS
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================
          NAVIGATION
      ========================================================= */}

      <nav
        className="
          flex-1
          space-y-7
          px-4
          py-6
        "
      >
        <NavSection
          title="Workspace"
          items={workspace}
        />

        <NavSection
          title="AI Tools"
          items={aiTools}
        />
      </nav>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer
        className="
          shrink-0
          space-y-3
          border-t
          p-4
        "
        style={{
          borderColor: "var(--border)",
        }}
      >
        <SettingsLink />

        {/* Storage */}

        <div
          className="
            group
            rounded-2xl
            border
            p-4
            transition-all
            duration-200
            hover:-translate-y-[1px]
          "
          style={{
            background:
              "color-mix(in srgb,var(--surfaceHover) 70%,transparent)",

            borderColor:
              "var(--border)",
          }}
        >
          <div
            className="
              mb-3
              flex
              items-center
              justify-between
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                "
                style={{
                  background:
                    "color-mix(in srgb,var(--accent-color) 10%,transparent)",
                }}
              >
                <HardDrive
                  size={15}
                  strokeWidth={2}
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
              </span>

              <span
                className="
                  text-sm
                  font-semibold
                "
                style={{
                  color: "var(--text)",
                }}
              >
                Storage
              </span>
            </div>

            <span
              className="
                rounded-lg
                px-2
                py-1
                text-[11px]
                font-semibold
              "
              style={{
                color:
                  "var(--accent-color)",

                background:
                  "color-mix(in srgb,var(--accent-color) 8%,transparent)",
              }}
            >
              38%
            </span>
          </div>

          {/* Progress */}

          <div
            className="
              h-1.5
              overflow-hidden
              rounded-full
            "
            style={{
              backgroundColor:
                "color-mix(in srgb,var(--border) 80%,transparent)",
            }}
          >
            <div
              className="
                h-full
                w-[38%]
                rounded-full
                transition-all
                duration-500
                ease-out
                group-hover:w-[40%]
              "
              style={{
                background:
                  "linear-gradient(90deg,var(--accent-color),color-mix(in srgb,var(--accent-color) 65%,white))",

                boxShadow:
                  "0 0 10px color-mix(in srgb,var(--accent-color) 30%,transparent)",
              }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between">
            <p
              className="text-[10px]"
              style={{
                color: "var(--muted)",
              }}
            >
              Workspace storage used
            </p>

            <span
              className="
                text-[10px]
                font-medium
              "
              style={{
                color: "var(--muted)",
              }}
            >
              38%
            </span>
          </div>
        </div>
      </footer>
    </aside>
  );
}