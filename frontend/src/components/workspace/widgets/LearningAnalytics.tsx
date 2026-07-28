
import {
  BookOpen,
  Brain,
  Clock,
  Trophy,
} from "lucide-react";

const stats = [
  {
    title: "Study Hours",
    value: "42h",
    icon: Clock,
  },
  {
    title: "Documents",
    value: "12",
    icon: BookOpen,
  },
  {
    title: "AI Sessions",
    value: "86",
    icon: Brain,
  },
  {
    title: "Achievements",
    value: "08",
    icon: Trophy,
  },
];

export default function LearningAnalytics() {
  return (
    <section className="mb-8">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white">
          Learning Analytics
        </h2>

        <p className="text-slate-400">
          Your learning progress at a glance
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/20">
                <Icon
                  size={22}
                  className="text-indigo-400"
                />
              </div>

              <p className="text-sm text-slate-400">
                {item.title}
              </p>

              <h3 className="mt-2 text-3xl font-bold text-white">
                {item.value}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}
