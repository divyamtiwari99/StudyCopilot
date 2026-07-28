import { Upload, FilePlus2, Sparkles } from "lucide-react";

const actions = [
  {
    title: "Upload PDF",
    icon: Upload,
  },
  {
    title: "New Note",
    icon: FilePlus2,
  },
  {
    title: "Ask AI",
    icon: Sparkles,
  },
];

export default function QuickActions() {
  return (
    <div className="flex gap-3">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <button
            key={action.title}
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300 transition hover:border-indigo-500 hover:bg-slate-800 hover:text-white"
          >
            <Icon size={18} />
            {action.title}
          </button>
        );
      })}
    </div>
  );
}