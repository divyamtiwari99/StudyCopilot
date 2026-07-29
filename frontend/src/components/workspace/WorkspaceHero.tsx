import {
  ArrowRight,
  BrainCircuit,
  Sparkles,
  Upload,
} from "lucide-react";

import Button from "../ui/Button";

export default function WorkspaceHero() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-10 backdrop-blur-3xl">

      {/* Background Glow */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="absolute -bottom-20 left-10 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 flex items-center justify-between gap-10">

        {/* Left */}
        <div className="max-w-3xl">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            <Sparkles size={16} />
            AI Learning Operating System
          </div>

          <h1 className="text-6xl font-black leading-tight text-white">
            Learn Faster.
            <br />
            Remember Longer.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Upload documents, chat with AI, generate quizzes,
            build flashcards, and create notes from one beautiful
            workspace.
          </p>

          <div className="mt-10 flex gap-4">

            <Button
              size="lg"
              className="gap-3"
            >
              <Upload size={20} />
              Upload Study Material
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="gap-3"
            >
              <BrainCircuit size={20} />
              Ask AI
              <ArrowRight size={18} />
            </Button>

          </div>

        </div>

        {/* Right */}
        <div className="grid w-[360px] gap-5">

          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6">
            <p className="text-sm text-slate-400">
              Active Documents
            </p>

            <h2 className="mt-2 text-5xl font-bold text-white">
              18
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6">
            <p className="text-sm text-slate-400">
              AI Conversations
            </p>

            <h2 className="mt-2 text-5xl font-bold text-white">
              245
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6">
            <p className="text-sm text-slate-400">
              Learning Streak
            </p>

            <h2 className="mt-2 text-5xl font-bold text-white">
              18 Days
            </h2>
          </div>

        </div>

      </div>

    </section>
  );
}