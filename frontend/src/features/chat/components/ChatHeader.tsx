import {
  BrainCircuit,
  FileText,
  Plus,
  Sparkles,
} from "lucide-react";

interface Props {
  title: string;
  status: string;
  chunks?: number;
}

export default function ChatHeader({
  title,
  status,
  chunks,
}: Props) {
  return (
    <header className="border-b border-white/10 bg-white/[0.03] px-6 py-4 backdrop-blur-xl">

      <div className="flex items-center justify-between gap-6">

        {/* Left */}

        <div className="flex min-w-0 items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20">

            <FileText
              size={26}
              className="text-indigo-400"
            />

          </div>

          <div className="min-w-0">

            <h2 className="truncate text-3xl font-bold text-white">

              {title}

            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-3">

              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">

                {status}

              </span>

              <span className="flex items-center gap-1 text-sm text-slate-400">

                <Sparkles size={14} />

                Gemini 2.5 Flash

              </span>

              <span className="flex items-center gap-1 text-sm text-slate-400">

                <BrainCircuit size={14} />

                {chunks ?? "--"} Chunks

              </span>

            </div>

          </div>

        </div>

        {/* Right */}

        <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition hover:border-indigo-500/30 hover:bg-indigo-500/10">

          <Plus size={18} />

          New Chat

        </button>

      </div>

    </header>
  );
}