import {
  BrainCircuit,
  FileText,
  MessageSquare,
  NotebookPen,
  Sparkles,
} from "lucide-react";

import Section from "../../../components/ui/Section";
import SectionHeading from "../../../components/ui/SectionHeading";

export default function WorkspacePreview() {
  return (
    <Section>
      <SectionHeading
        badge="Workspace"
        title="One Workspace."
        highlight="Unlimited Learning."
        description="Everything happens in one AI powered workspace."
      />

      <div className="mt-20 rounded-[36px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
        {/* Header */}

        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-600/20 p-3">
              <FileText className="h-6 w-6 text-violet-400" />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Operating-System.pdf
              </h3>

              <p className="text-sm text-zinc-500">
                Ready for AI
              </p>
            </div>
          </div>

          <div className="rounded-full bg-green-500/20 px-4 py-2 text-sm text-green-400">
            AI Ready
          </div>
        </div>

        {/* Chat */}

        <div className="space-y-5">
          <div className="ml-auto max-w-md rounded-3xl bg-violet-600 px-5 py-4 text-white">
            Explain Virtual Memory.
          </div>

          <div className="max-w-xl rounded-3xl border border-white/10 bg-zinc-900/70 p-5">
            <div className="mb-4 flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-violet-400" />

              <span className="font-medium text-white">
                StudyCopilot AI
              </span>
            </div>

            <p className="leading-8 text-zinc-300">
              Virtual memory allows the operating
              system to efficiently manage RAM by
              using disk storage as an extension of
              physical memory.
            </p>
          </div>
        </div>

        {/* Actions */}

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <button className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-white transition hover:border-violet-500">
            <NotebookPen className="h-5 w-5" />
            Generate Notes
          </button>

          <button className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-white transition hover:border-violet-500">
            <Sparkles className="h-5 w-5" />
            Generate Quiz
          </button>

          <button className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-white transition hover:border-violet-500">
            <MessageSquare className="h-5 w-5" />
            Flashcards
          </button>
        </div>
      </div>
    </Section>
  );
}