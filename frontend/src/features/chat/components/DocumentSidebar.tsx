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
}: Props) {
  return (
    <aside className="space-y-5">

      {/* Document */}

      <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">

        <div className="flex h-18 w-18 items-center justify-center rounded-3xl bg-indigo-500/10">

          <FileText
            size={30}
            className="text-indigo-400"
          />

        </div>

        <h2 className="mt-5 line-clamp-2 text-[30px] font-bold leading-tight text-white">

          {title}

        </h2>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">

          <CheckCircle2 size={16} />

          {status}

        </div>

      </div>

      {/* Insights */}

      <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6">

        <div className="mb-6 flex items-center gap-2">

          <Sparkles
            size={18}
            className="text-indigo-400"
          />

          <h3 className="font-semibold text-white">

            Document Insights

          </h3>

        </div>

        <div className="space-y-5">

          <div className="flex items-center justify-between">

            <span className="text-slate-400">

              Pages

            </span>

            <span className="font-medium text-white">

              {pages || "--"}

            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-slate-400">

              Size

            </span>

            <span className="font-medium text-white">

              {size}

            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-slate-400">

              Reading Time

            </span>

            <span className="flex items-center gap-2 font-medium text-white">

              <Clock3 size={15} />

              Coming Soon

            </span>

          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <div>

        <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">

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
                  className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-left transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/10"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 transition group-hover:bg-indigo-500/20">

                    <Icon
                      size={20}
                      className="text-indigo-400"
                    />

                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="font-medium text-white">

                      {action.title}

                    </p>

                    <p className="mt-1 text-xs text-slate-400">

                      {action.subtitle}

                    </p>

                  </div>

                </button>

              );

            },
          )}

        </div>

      </div>

    </aside>
  );
}