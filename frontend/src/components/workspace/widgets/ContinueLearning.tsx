
import { ArrowRight } from "lucide-react";

const documents = [
  {
    id: 1,
    title: "Operating Systems",
    progress: 68,
    lessons: "12 Chapters",
  },
  {
    id: 2,
    title: "DBMS",
    progress: 42,
    lessons: "8 Chapters",
  },
  {
    id: 3,
    title: "Computer Networks",
    progress: 21,
    lessons: "10 Chapters",
  },
];

export default function ContinueLearning() {
  return (
    <section className="mb-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Continue Learning
        </h2>

        <button className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300">
          View All
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-indigo-500"
          >
            <p className="text-sm text-slate-400">
              {doc.lessons}
            </p>

            <h3 className="mt-2 text-xl font-semibold text-white">
              {doc.title}
            </h3>

            <div className="mt-6 h-2 rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-indigo-500"
                style={{
                  width: `${doc.progress}%`,
                }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-slate-400">
                {doc.progress}% Completed
              </span>

              <button className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500">
                Continue
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
