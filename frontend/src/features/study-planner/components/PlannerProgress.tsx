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
    <div>
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <p
            className="
              text-sm
              uppercase
              tracking-widest
            "
            style={{
              color: "var(--accent-color)",
            }}
          >
            Progress
          </p>

          <h2
            className="
              mt-3
              text-3xl
              font-bold
            "
            style={{
              color: "var(--text)",
            }}
          >
            {progress}%
          </h2>

          <p
            className="mt-3"
            style={{
              color: "var(--muted)",
            }}
          >
            {completed} of {total} tasks completed
          </p>
        </div>

        <div
          className="
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            border-4
          "
          style={{
            borderColor:
              "color-mix(in srgb,var(--accent-color) 30%,transparent)",
          }}
        >
          <TrendingUp
            size={34}
            style={{
              color: "var(--accent-color)",
            }}
          />
        </div>
      </div>

      <div
        className="
          mt-8
          h-3
          overflow-hidden
          rounded-full
        "
        style={{
          backgroundColor: "var(--surfaceHover)",
        }}
      >
        <div
          className="
            h-full
            rounded-full
            transition-all
            duration-700
          "
          style={{
            width: `${progress}%`,
            background:
              "linear-gradient(90deg,var(--accent-color),color-mix(in srgb,var(--accent-color) 60%,white))",
          }}
        />
      </div>

      <div
        className="
          mt-6
          flex
          items-center
          gap-3
          rounded-2xl
          border
          p-4
        "
        style={{
          borderColor:
            "color-mix(in srgb,var(--accent-color) 20%,transparent)",
          backgroundColor:
            "color-mix(in srgb,var(--accent-color) 10%,transparent)",
        }}
      >
        <Target
          size={18}
          style={{
            color: "var(--accent-color)",
          }}
        />

        <p
          className="text-sm"
          style={{
            color:
              "color-mix(in srgb,var(--accent-color) 70%,var(--text))",
          }}
        >
          Keep completing daily tasks to finish your study plan faster.
        </p>
      </div>
    </div>
  );
}