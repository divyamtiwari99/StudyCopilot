import { CalendarDays, Sparkles } from "lucide-react";

interface PlannerHeroProps {
  onGenerate?: () => void;

  loading?: boolean;
}

export default function PlannerHero({
  onGenerate,
  loading = false,
}: PlannerHeroProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">

            <CalendarDays size={16} />

            AI Study Planner

          </div>

          <h1 className="text-4xl font-bold text-white">
            Personalized Learning Plan
          </h1>

          <p className="mt-5 max-w-2xl leading-8 text-zinc-400">
            Generate an AI-powered day-by-day study schedule
            based on your uploaded learning material, including
            revision sessions, quizzes, and progress tracking.
          </p>

        </div>

        <button
          onClick={onGenerate}
          disabled={loading}
          className="inline-flex items-center justify-center gap-3 rounded-2xl bg-cyan-500 px-7 py-4 font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
        >

          <Sparkles size={18} />

          {loading
            ? "Generating..."
            : "Generate Planner"}

        </button>

      </div>

    </section>
  );
}