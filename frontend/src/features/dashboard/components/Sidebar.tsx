import {
  BookOpen,
  BrainCircuit,
  FileText,
  Home,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  {
    icon: Home,
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    icon: FileText,
    label: "Documents",
    to: "/dashboard/documents",
  },
  {
    icon: BrainCircuit,
    label: "AI Chat",
    to: "/dashboard/chat",
  },
  {
    icon: BookOpen,
    label: "Notes",
    to: "/dashboard/notes",
  },
  {
    icon: Settings,
    label: "Settings",
    to: "/dashboard/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col overflow-hidden border-r border-white/10 bg-[#0D0D11]">
      <div className="border-b border-white/10 p-6">
  <div className="flex items-center gap-3">

    <img
      src="/logo.png"
      alt="StudyCopilot Logo"
      className="h-12 w-12 rounded-2xl object-contain"
    />

    <div>
      <h1 className="text-xl font-bold text-white">
        StudyCopilot
      </h1>

      <p className="text-xs text-zinc-400">
        AI Learning Assistant
      </p>
    </div>

  </div>
</div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-5 scrollbar-hide">
        {links.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}