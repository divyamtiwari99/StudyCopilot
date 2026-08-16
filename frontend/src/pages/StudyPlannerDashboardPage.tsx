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
      <div
        className="
          flex
          h-[70vh]
          items-center
          justify-center
        "
        style={{
          color: "var(--text)",
        }}
      >
        Loading Study Planners...
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
          flex
          h-[70vh]
          items-center
          justify-center
          text-red-700
        "
      >
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
        <h1
          className="
            text-4xl
            font-bold
          "
          style={{
            color: "var(--text)",
          }}
        >
          Study Planner
        </h1>

        <p
          className="mt-3"
          style={{
            color: "var(--muted)",
          }}
        >
          Manage all your AI generated study plans.
        </p>
      </section>

      {planners.length === 0 ? (
        <section
          className="
            rounded-3xl
            border
            p-16
            text-center
          "
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
          }}
        >
          <BrainCircuit
            size={56}
            className="
              mx-auto
              mb-6
            "
            style={{
              color: "var(--accent-color)",
            }}
          />

          <h2
            className="
              text-3xl
              font-bold
            "
            style={{
              color: "var(--text)",
            }}
          >
            No Study Planner Found
          </h2>

          <p
            className="mt-4"
            style={{
              color: "var(--muted)",
            }}
          >
            Generate a Study Planner from any
            uploaded document.
          </p>
        </section>
      ) : (
        <section
          className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {planners.map((planner) => (
            <article
              key={planner.id}
              className="
                rounded-3xl
                border
                p-7
                transition-all
                duration-200
              "
              style={{
                borderColor:
                  "var(--border)",
                backgroundColor:
                  "var(--surface)",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.backgroundColor =
                  "var(--surfaceHover)";

                event.currentTarget.style.borderColor =
                  "color-mix(in srgb,var(--accent-color) 30%,var(--border))";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor =
                  "var(--surface)";

                event.currentTarget.style.borderColor =
                  "var(--border)";
              }}
            >
              <div
                className="
                  mb-6
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                "
                style={{
                  backgroundColor:
                    "color-mix(in srgb,var(--accent-color) 10%,transparent)",
                }}
              >
                <BrainCircuit
                  size={28}
                  style={{
                    color:
                      "var(--accent-color)",
                  }}
                />
              </div>

              <h2
                className="
                  line-clamp-2
                  text-2xl
                  font-bold
                "
                style={{
                  color: "var(--text)",
                }}
              >
                {planner.originalName}
              </h2>

              <div
                className="
                  mt-6
                  space-y-3
                  text-sm
                "
                style={{
                  color: "var(--muted)",
                }}
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Calendar size={16} />

                  {new Date(
                    planner.createdAt,
                  ).toLocaleDateString()}
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Clock3 size={16} />

                  Ready
                </div>
              </div>

              <Link
                to={`/dashboard/study-planner/${planner.id}`}
                className="
                  mt-8
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  px-5
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:brightness-95
                "
                style={{
                  backgroundColor:
                    "var(--accent-color)",
                }}
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