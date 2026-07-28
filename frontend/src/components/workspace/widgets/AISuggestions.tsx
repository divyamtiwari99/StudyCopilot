
import { Sparkles, ArrowRight } from "lucide-react";

const suggestions = [
  {
    id: 1,
    title: "Generate Quiz",
    description: "Create 20 MCQs from Operating Systems",
  },
  {
    id: 2,
    title: "Summarize PDF",
    description: "Generate concise notes from DBMS",
  },
  {
    id: 3,
    title: "Interview Mode",
    description: "Practice AI mock interview",
  },
];

export default function AISuggestions() {
  return (
    <section className="mb-8">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            AI Suggestions
          </h2>

          <p className="text-sm text-slate-400">
            Personalized recommendations for you
          </p>
        </div>

        <Sparkles className="text-indigo-500" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {suggestions.map((item) => (
          <div
            key={item.id}
            className="group rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/20">
              <Sparkles className="text-indigo-400" size={22} />
            </div>

            <h3 className="text-lg font-semibold text-white">
              {item.title}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              {item.description}
            </p>

            <button className="mt-6 flex items-center gap-2 text-indigo-400 transition group-hover:gap-3">
              Open
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
