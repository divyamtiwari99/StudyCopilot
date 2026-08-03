import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
} from "lucide-react";

import { useMemo, useState } from "react";

interface PlannerTask {
  title: string;
  estimatedTime?: string;
}

interface PlannerDay {
  day: number;
  title: string;
  description?: string;
  tasks: PlannerTask[];
}

interface PlannerTimelineProps {
  days: PlannerDay[];
  onProgressChange?: (
    completed: number,
    total: number,
  ) => void;
}

export default function PlannerTimeline({
  days,
  onProgressChange,
}: PlannerTimelineProps) {
  const [completedTasks, setCompletedTasks] =
    useState<Record<string, boolean>>({});

  const totalTasks = useMemo(
    () =>
      days.reduce(
        (total, day) =>
          total + day.tasks.length,
        0,
      ),
    [days],
  );

  const completedCount = useMemo(
    () =>
      Object.values(
        completedTasks,
      ).filter(Boolean).length,
    [completedTasks],
  );

  useMemo(() => {
    onProgressChange?.(
      completedCount,
      totalTasks,
    );
  }, [
    completedCount,
    totalTasks,
    onProgressChange,
  ]);

  if (!days.length) {
    return (
      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-12 text-center backdrop-blur-xl">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-500/10">
          <CalendarDays
            size={40}
            className="text-cyan-400"
          />
        </div>

        <h2 className="text-3xl font-bold text-white">
          No Study Plan Yet
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-zinc-400">
          Generate your personalized AI Study Planner
          to begin learning.
        </p>
      </section>
    );
  }

  function toggleTask(id: string) {
    setCompletedTasks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <div className="space-y-8">
      {days.map((day) => (
        <section
          key={day.day}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition hover:border-cyan-500/20"
        >
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
              <CalendarDays size={16} />
              Day {day.day}
            </div>

            <h2 className="mt-5 text-2xl font-bold text-white">
              {day.title}
            </h2>

            {day.description && (
              <p className="mt-3 max-w-3xl text-zinc-400">
                {day.description}
              </p>
            )}
          </div>

          <div className="space-y-4">
            {day.tasks.map(
              (task, index) => {
                const id = `${day.day}-${index}`;

                const completed =
                  completedTasks[id];

                return (
                  <button
                    key={id}
                    onClick={() =>
                      toggleTask(id)
                    }
                    className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[#0b1220] px-6 py-5 text-left transition hover:border-cyan-500/20 hover:bg-[#111827]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10">
                        {completed ? (
                          <CheckCircle2
                            size={20}
                            className="text-emerald-400"
                          />
                        ) : (
                          <Circle
                            size={20}
                            className="text-cyan-400"
                          />
                        )}
                      </div>

                      <div>
                        <h3
                          className={`font-semibold ${
                            completed
                              ? "text-zinc-500 line-through"
                              : "text-white"
                          }`}
                        >
                          {task.title}
                        </h3>
                      </div>
                    </div>

                    {task.estimatedTime && (
                      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-400">
                        <Clock3 size={15} />
                        {task.estimatedTime}
                      </div>
                    )}
                  </button>
                );
              },
            )}
          </div>
        </section>
      ))}
    </div>
  );
}