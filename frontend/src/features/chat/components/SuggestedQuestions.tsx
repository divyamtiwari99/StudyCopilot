import {
  suggestedQuestions,
} from "../constants/suggestedQuestions";

interface Props {
  onSelect: (
    question: string,
  ) => void;
}

export default function SuggestedQuestions({
  onSelect,
}: Props) {
  return (
    <section className="mt-6">

      <h3 className="mb-4 text-lg font-semibold text-white">
        Suggested Questions
      </h3>

      <div className="flex flex-wrap gap-3">

        {suggestedQuestions.map(
          (item) => (
            <button
              key={item.id}
              onClick={() =>
                onSelect(
                  item.prompt,
                )
              }
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-slate-300 transition hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white"
            >
              {item.label}
            </button>
          ),
        )}

      </div>

    </section>
  );
}