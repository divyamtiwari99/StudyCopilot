import {
  ArrowRight,
  BrainCircuit,
  Clock3,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const suggestions = [
  {
    title: "Continue Machine Learning",
    subtitle: "Resume from Chapter 7",
  },
  {
    title: "Generate Quiz",
    subtitle: "Create 20 MCQs from uploaded PDF",
  },
  {
    title: "Summarize Notes",
    subtitle: "Convert today's notes into revision sheet",
  },
];

export default function AICommandCenter() {
  return (
    <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">

      {/* Main Card */}

      <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-3xl">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">
              AI COMMAND CENTER
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              What would you like to learn today?
            </h2>

          </div>

          <BrainCircuit
            size={40}
            className="text-indigo-400"
          />

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0b1020] p-5">

          <textarea
            rows={4}
            placeholder="Ask AI anything about your study materials..."
            className="w-full resize-none bg-transparent text-white placeholder:text-slate-500 outline-none"
          />

          <div className="mt-5 flex justify-end">

            <button className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:scale-105">

              <Sparkles size={18} />

              Ask AI

            </button>

          </div>

        </div>

      </div>

      {/* Suggestions */}

      <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-3xl">

        <div className="mb-6 flex items-center gap-3">

          <TrendingUp className="text-cyan-400" />

          <h3 className="text-xl font-semibold text-white">
            Smart Suggestions
          </h3>

        </div>

        <div className="space-y-4">

          {suggestions.map((item) => (
            <button
              key={item.title}
              className="group w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-indigo-500/40 hover:bg-white/[0.06]"
            >
              <div className="flex items-start justify-between">

                <div>

                  <h4 className="font-semibold text-white">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-sm text-slate-400">
                    {item.subtitle}
                  </p>

                </div>

                <ArrowRight className="transition group-hover:translate-x-1" />

              </div>

            </button>
          ))}

        </div>

        <div className="mt-8 flex items-center gap-2 text-sm text-slate-400">

          <Clock3 size={16} />

          Updated a few seconds ago

        </div>

      </div>

    </section>
  );
}