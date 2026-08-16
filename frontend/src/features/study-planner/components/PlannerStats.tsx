import {
  Clock3,
  BookOpen,
  Target,
  TrendingUp,
} from "lucide-react";

interface PlannerStatsProps {
  estimatedDays?: number;
  dailyStudyHours?: string;
  totalTopics?: number;
  progress?: number;
}

export default function PlannerStats({
  estimatedDays = 0,
  dailyStudyHours = "--",
  totalTopics = 0,
  progress = 0,
}: PlannerStatsProps) {
  const cards = [
    {
      title: "Estimated Days",
      value:
        estimatedDays > 0
          ? `${estimatedDays} Days`
          : "--",
      icon: Clock3,
    },
    {
      title: "Daily Study",
      value: dailyStudyHours,
      icon: Target,
    },
    {
      title: "Topics",
      value: totalTopics,
      icon: BookOpen,
    },
    {
      title: "Progress",
      value: `${progress}%`,
      icon: TrendingUp,
    },
  ];

  return (
    <section
      className="
        grid
        gap-5
        md:grid-cols-2
        xl:grid-cols-4
      "
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-3xl
              border
              p-6
              backdrop-blur-xl
              transition-all
              duration-200
            "
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--surface)",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.backgroundColor =
                "var(--surfaceHover)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.backgroundColor =
                "var(--surface)";
            }}
          >
            <div
              className="
                mb-5
                inline-flex
                rounded-2xl
                p-4
              "
              style={{
                backgroundColor:
                  "color-mix(in srgb,var(--accent-color) 10%,transparent)",
                color: "var(--accent-color)",
              }}
            >
              <Icon size={24} />
            </div>

            <p
              className="text-sm"
              style={{
                color: "var(--muted)",
              }}
            >
              {card.title}
            </p>

            <h2
              className="
                mt-2
                text-3xl
                font-bold
              "
              style={{
                color: "var(--text)",
              }}
            >
              {card.value}
            </h2>
          </div>
        );
      })}
    </section>
  );
}