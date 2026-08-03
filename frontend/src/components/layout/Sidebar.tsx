import { NavLink } from "react-router-dom";
import {
  Sparkles,
  LayoutDashboard,
  FileText,
  BrainCircuit,
  NotebookPen,
  Brain,
  Layers3,
  Settings,
  HardDrive,
  Flame,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

const navigation = [
  {
    title: "Workspace",
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
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-[290px] flex-col border-r border-white/10 bg-[#050816]/80 backdrop-blur-2xl">

      {/* Logo */}

      <div className="border-b border-white/10 p-7">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-600/30">
            <Sparkles
              className="text-white"
              size={22}
            />
          </div>

          <div>

            <h1 className="text-xl font-bold tracking-tight text-white">
              StudyCopilot
            </h1>

            <p className="text-xs text-slate-400">
              Learning OS
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-5 py-6">

        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          Workspace
        </p>

        {navigation.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `group mb-2 flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-500/15 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >

              <div className="flex items-center gap-3">

                <Icon size={20} />

                <span className="font-medium">
                  {item.title}
                </span>

              </div>

              <ChevronRight
                size={16}
                className="opacity-0 transition group-hover:opacity-100"
              />

            </NavLink>

          );

        })}

      </nav>

      {/* Learning Streak */}

      <div className="px-5">

        <div className="rounded-3xl border border-orange-500/20 bg-orange-500/10 p-5">

          <div className="mb-3 flex items-center gap-3">

            <div className="rounded-xl bg-orange-500/20 p-2">
              <Flame
                className="text-orange-400"
                size={18}
              />
            </div>

            <div>

              <p className="text-xs uppercase tracking-widest text-orange-300">
                Streak
              </p>

              <h3 className="text-xl font-bold text-white">
                18 Days
              </h3>

            </div>

          </div>

          <p className="text-sm text-slate-300">
            Keep learning today to maintain your streak.
          </p>

        </div>

      </div>

      {/* Storage */}

      <div className="p-5">

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">

          <div className="mb-4 flex items-center gap-3">

            <HardDrive
              className="text-indigo-400"
              size={20}
            />

            <span className="font-semibold text-white">
              Storage
            </span>

          </div>

          <div className="mb-2 h-2 overflow-hidden rounded-full bg-slate-800">

            <div className="h-full w-[38%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />

          </div>

          <div className="flex justify-between text-xs text-slate-400">

            <span>3.8 GB</span>

            <span>10 GB</span>

          </div>

        </div>

      </div>

    </aside>
  );
}