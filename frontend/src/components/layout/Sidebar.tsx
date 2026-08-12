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
  Flame,
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

function NavSection({
  title,
  items,
}: {
  title: string;
  items: typeof workspace;
}) {
  return (
    <div>
      <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        {title}
      </p>

      {items.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `mb-1.5 flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${isActive
                ? "bg-[color-mix(in_srgb,var(--accent-color)_15%,transparent)] text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon size={18} />

            <span className="text-sm font-medium">
              {item.title}
            </span>
          </NavLink>
        );
      })}
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="flex h-full flex-col">
      {/* Logo */}

      <div className="border-b border-white/10 px-6 py-5">
        <div className="flex items-center gap-3">

          <img
            src="/logo.png"
            alt="StudyCopilot Logo"
            className="
    h-10
    w-10
    rounded-xl
    object-contain
  "
          />


          <div>
            <h1 className="text-lg font-bold text-white">
              StudyCopilot
            </h1>

            <p className="text-[11px] text-slate-400">
              Learning OS
            </p>
          </div>

        </div>
      </div>


      {/* Navigation */}

      <div className="flex-1 overflow-y-auto px-4 py-5">

        <NavSection
          title="Workspace"
          items={workspace}
        />

        <NavSection
          title="AI Tools"
          items={aiTools}
        />


        <div className="mt-5">

          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            System
          </p>


          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${isActive
                ? "bg-[color-mix(in_srgb,var(--accent-color)_15%,transparent)] text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >

            <Settings size={18} />

            <span className="text-sm font-medium">
              Settings
            </span>

          </NavLink>

        </div>

      </div>


      {/* Footer */}

      <div className="space-y-3 border-t border-white/10 p-4">


        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-3">

          <div className="flex items-center gap-3">

            <Flame
              size={18}
              className="text-orange-400"
            />

            <div>

              <p className="text-xs text-orange-300">
                Learning Streak
              </p>

              <p className="font-semibold text-white">
                18 Days
              </p>

            </div>

          </div>

        </div>



        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">


          <div className="mb-2 flex items-center justify-between">


            <div className="flex items-center gap-2">

              <HardDrive
                size={16}
                style={{
                  color:
                    "var(--accent-color)",
                }}
              />


              <span className="text-sm text-white">
                Storage
              </span>

            </div>


            <span className="text-xs text-slate-400">
              38%
            </span>


          </div>



          <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">

            <div
              className="
                h-full
                w-[38%]
                rounded-full
              "
              style={{
                background:
                  "linear-gradient(90deg,var(--accent-color),#22d3ee)",
              }}
            />

          </div>


        </div>


      </div>

    </aside>
  );
}