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
    <div
      className="
        flex
        flex-col
        items-center
        text-center
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-3xl
          border
        "
        style={{
          borderColor:
            "color-mix(in srgb,var(--accent-color) 20%,transparent)",
          backgroundColor:
            "color-mix(in srgb,var(--accent-color) 10%,transparent)",
        }}
      >
        <CalendarDays
          size={40}
          style={{
            color: "var(--accent-color)",
          }}
        />
      </div>

      <h2
        className="
          mt-8
          text-3xl
          font-bold
        "
        style={{
          color: "var(--text)",
        }}
      >
        No Study Planner Yet
      </h2>

      <p
        className="
          mx-auto
          mt-5
          max-w-2xl
          leading-8
        "
        style={{
          color: "var(--muted)",
        }}
      >
        Generate your personalized AI Study Planner.
        StudyCopilot will automatically organize your
        document into a day-by-day learning schedule,
        including revision sessions, quizzes and
        estimated study time.
      </p>

      <button
        type="button"
        onClick={onGenerate}
        disabled={loading}
        className="
          mt-10
          inline-flex
          items-center
          gap-3
          rounded-2xl
          px-8
          py-4
          font-semibold
          text-white
          transition
          hover:brightness-95
          disabled:cursor-not-allowed
          disabled:opacity-70
        "
        style={{
          backgroundColor:
            "var(--accent-color)",
        }}
      >
        <Sparkles size={18} />

        {loading
          ? "Generating..."
          : "Generate Study Planner"}
      </button>
    </div>
  );
}