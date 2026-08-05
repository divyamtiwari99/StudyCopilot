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
    <section className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-3xl">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">

            <Sparkles size={15} />

            Quick Actions

          </div>

          <h2 className="mt-5 text-3xl font-bold text-white">
            What would you like to do?
          </h2>

          <p className="mt-2 text-slate-400">
            Jump directly into your next learning task.
          </p>

        </div>

      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {actions.map((action) => {

          const Icon = action.icon;

          return (

            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white/[0.05]"
            >

              <div className="flex items-center justify-between">

                <div className="rounded-2xl bg-indigo-500/10 p-3">

                  <Icon
                    size={24}
                    className="text-indigo-400"
                  />

                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-white"
                />

              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">
                {action.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {action.subtitle}
              </p>

            </button>

          );

        })}

      </div>

    </section>
  );
}