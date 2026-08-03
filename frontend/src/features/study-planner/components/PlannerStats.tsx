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
      color: "text-cyan-400",
    },
    {
      title: "Daily Study",
      value: dailyStudyHours,
      icon: Target,
      color: "text-emerald-400",
    },
    {
      title: "Topics",
      value: totalTopics,
      icon: BookOpen,
      color: "text-violet-400",
    },
    {
      title: "Progress",
      value: `${progress}%`,
      icon: TrendingUp,
      color: "text-orange-400",
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
          >
            <div
              className={`mb-5 inline-flex rounded-2xl bg-white/5 p-4 ${card.color}`}
            >
              <Icon size={24} />
            </div>

            <p className="text-sm text-zinc-400">
              {card.title}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {card.value}
            </h2>
          </div>
        );
      })}
    </section>
  );
}