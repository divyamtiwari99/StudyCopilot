import { Link } from "react-router-dom";

import {
  ArrowRight,
  BrainCircuit,
  Calendar,
  Clock3,
} from "lucide-react";

import { useDocuments } from "@/features/documents/hooks/useDocuments";

export default function StudyPlannerDashboardPage() {
  const {
    data,
    isLoading,
    isError,
  } = useDocuments();

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-white">
        Loading Study Planners...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-red-400">
        Failed to load Study Planners.
      </div>
    );
  }

  const planners =
    (data ?? []).filter(
      (doc) =>
        doc.processing?.studyPlanner,
    );

  return (
    <main className="space-y-10">

      {/* Header */}

      <section>

        <h1 className="text-4xl font-bold text-white">
          Study Planner
        </h1>

        <p className="mt-3 text-zinc-400">
          Manage all your AI generated study plans.
        </p>

      </section>

      {planners.length === 0 ? (

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-16 text-center">

          <BrainCircuit
            size={56}
            className="mx-auto mb-6 text-cyan-400"
          />

          <h2 className="text-3xl font-bold text-white">
            No Study Planner Found
          </h2>

          <p className="mt-4 text-zinc-400">
            Generate a Study Planner from any
            uploaded document.
          </p>

        </section>

      ) : (

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {planners.map((planner) => (

            <article
              key={planner.id}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:border-cyan-500/30 hover:bg-white/[0.06]"
            >

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">

                <BrainCircuit
                  className="text-cyan-400"
                  size={28}
                />

              </div>

              <h2 className="line-clamp-2 text-2xl font-bold text-white">
                {planner.originalName}
              </h2>

              <div className="mt-6 space-y-3 text-sm text-zinc-400">

                <div className="flex items-center gap-2">

                  <Calendar size={16} />

                  {new Date(
                    planner.createdAt,
                  ).toLocaleDateString()}

                </div>

                <div className="flex items-center gap-2">

                  <Clock3 size={16} />

                  Ready

                </div>

              </div>

              <Link
                to={`/dashboard/study-planner/${planner.id}`}
                className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:bg-cyan-400"
              >

                Open Planner

                <ArrowRight size={18} />

              </Link>

            </article>

          ))}

        </section>

      )}

    </main>
  );
}