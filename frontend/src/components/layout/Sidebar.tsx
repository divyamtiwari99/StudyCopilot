import {
  LayoutDashboard,
  FileText,
  Bot,
  NotebookPen,
  Brain,
  Layers3,
  Settings,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Documents",
    icon: FileText,
  },
  {
    title: "AI Chat",
    icon: Bot,
  },
  {
    title: "Notes",
    icon: NotebookPen,
  },
  {
    title: "Quiz",
    icon: Brain,
  },
  {
    title: "Flashcards",
    icon: Layers3,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950">
      <div className="border-b border-slate-800 p-6">
        <h2 className="text-2xl font-bold text-indigo-500">
          StudyCopilot
        </h2>
      </div>

      <nav className="p-4">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-900 hover:text-white"
            >
              <Icon size={20} />
              {item.title}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}