import {
  CalendarDays,
  Sparkles,
} from "lucide-react";

interface EmptyPlannerProps {
  onGenerate?: () => void;

  loading?: boolean;
}

export default function EmptyPlanner({
  onGenerate,
  loading = false,
}: EmptyPlannerProps) {
  return (
    <section className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] px-8 py-20 text-center">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-500/20 bg-cyan-500/10">

        <CalendarDays
          size={40}
          className="text-cyan-400"
        />

      </div>

      <h2 className="mt-8 text-3xl font-bold text-white">
        No Study Planner Yet
      </h2>

      <p className="mx-auto mt-5 max-w-2xl leading-8 text-zinc-400">
        Generate your personalized AI Study Planner.
        StudyCopilot will automatically organize your
        document into a day-by-day learning schedule,
        including revision sessions, quizzes and
        estimated study time.
      </p>

      <button
        onClick={onGenerate}
        disabled={loading}
        className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-cyan-500 px-8 py-4 font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
      >

        <Sparkles size={18} />

        {loading
          ? "Generating..."
          : "Generate Study Planner"}

      </button>

    </section>
  );
}