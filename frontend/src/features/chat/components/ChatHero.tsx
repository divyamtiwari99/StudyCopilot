import { Sparkles } from "lucide-react";

export default function ChatHero() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-10 backdrop-blur-3xl">

      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="relative">

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2">

          <Sparkles
            size={16}
            className="text-indigo-400"
          />

          <span className="text-sm font-medium text-indigo-300">
            AI Tutor
          </span>

        </div>

        <h1 className="max-w-3xl text-5xl font-bold leading-tight text-white">

          Learn with your own documents using AI.

        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">

          Choose any uploaded document and start an intelligent
          conversation. Ask questions, understand concepts,
          summarize chapters, generate examples and learn
          faster with contextual AI.

        </p>

      </div>

    </section>
  );
}