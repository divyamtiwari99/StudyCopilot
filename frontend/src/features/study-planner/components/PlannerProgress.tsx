import {
  Target,
  TrendingUp,
} from "lucide-react";

interface PlannerProgressProps {
  completed: number;

  total: number;
}

export default function PlannerProgress({
  completed,
  total,
}: PlannerProgressProps) {
  const progress =
    total === 0
      ? 0
      : Math.round(
          (completed / total) * 100,
        );

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm uppercase tracking-widest text-cyan-400">
            Progress
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {progress}%
          </h2>

          <p className="mt-3 text-zinc-400">
            {completed} of {total} tasks completed
          </p>

        </div>

        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-cyan-500/30">

          <TrendingUp
            size={34}
            className="text-cyan-400"
          />

        </div>

      </div>

      <div className="mt-8 h-3 overflow-hidden rounded-full bg-white/10">

        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">

        <Target
          size={18}
          className="text-cyan-400"
        />

        <p className="text-sm text-cyan-200">
          Keep completing daily tasks to finish your study plan faster.
        </p>

      </div>

    </section>
  );
}