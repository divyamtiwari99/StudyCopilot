
import { Clock3 } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Operating Systems",
    action: "Quiz Generated",
    time: "5 min ago",
  },
  {
    id: 2,
    title: "DBMS Notes",
    action: "Summary Created",
    time: "18 min ago",
  },
  {
    id: 3,
    title: "Computer Networks",
    action: "AI Chat Started",
    time: "42 min ago",
  },
  {
    id: 4,
    title: "Resume Preparation",
    action: "Flashcards Created",
    time: "1 hour ago",
  },
];

export default function ActivityTimeline() {
  return (
    <section className="mb-8">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white">
          Recent Activity
        </h2>

        <p className="text-slate-400">
          Everything you've done recently
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        {activities.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-start gap-4 ${
              index !== activities.length - 1
                ? "mb-6 border-b border-slate-800 pb-6"
                : ""
            }`}
          >
            <div className="rounded-xl bg-indigo-600/20 p-3">
              <Clock3
                size={18}
                className="text-indigo-400"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                {item.action}
              </p>
            </div>

            <span className="text-xs text-slate-500">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
