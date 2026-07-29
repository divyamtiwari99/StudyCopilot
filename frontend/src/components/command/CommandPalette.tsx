import {
  BrainCircuit,
  Command,
  FileText,
  LayoutDashboard,
  NotebookPen,
  Search,
  Sparkles,
} from "lucide-react";

const actions = [
  {
    title: "Open Dashboard",
    description: "Go to your workspace",
    icon: LayoutDashboard,
  },
  {
    title: "Search Documents",
    description: "Find PDFs and notes",
    icon: FileText,
  },
  {
    title: "Ask AI Tutor",
    description: "Start a new conversation",
    icon: BrainCircuit,
  },
  {
    title: "Open Notes",
    description: "View your study notes",
    icon: NotebookPen,
  },
];

export default function CommandPalette() {
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 pt-24 backdrop-blur-md">

      <div className="w-full max-w-3xl overflow-hidden rounded-[32px] border border-white/10 bg-[#0d1122] shadow-2xl">

        <div className="flex items-center gap-4 border-b border-white/10 px-6 py-5">

          <Search
            size={22}
            className="text-slate-400"
          />

          <input
            placeholder="Ask StudyCopilot or search..."
            className="flex-1 bg-transparent text-lg text-white placeholder:text-slate-500 outline-none"
          />

          <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-400">

            <Command size={14} />

            K

          </div>

        </div>

        <div className="p-5">

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Suggested Actions
          </p>

          <div className="space-y-2">

            {actions.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.title}
                  className="flex w-full items-center gap-4 rounded-2xl p-4 text-left transition hover:bg-white/5"
                >
                  <div className="rounded-2xl bg-indigo-500/10 p-3">
                    <Icon
                      size={20}
                      className="text-indigo-400"
                    />
                  </div>

                  <div className="flex-1">

                    <h4 className="font-medium text-white">
                      {item.title}
                    </h4>

                    <p className="mt-1 text-sm text-slate-400">
                      {item.description}
                    </p>

                  </div>

                  <Sparkles
                    size={18}
                    className="text-slate-500"
                  />

                </button>
              );
            })}

          </div>

        </div>

      </div>

    </div>
  );
}