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
      <h3
        className="
          mb-4
          text-lg
          font-semibold
        "
        style={{
          color:
            "var(--text)",
        }}
      >
        Suggested Questions
      </h3>

      <div className="flex flex-wrap gap-3">
        {suggestedQuestions.map(
          (item) => (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                onSelect(
                  item.prompt,
                )
              }
              className="
                rounded-2xl
                border
                px-5
                py-3
                text-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
              "
              style={{
                background:
                  "var(--surfaceHover)",

                borderColor:
                  "var(--border)",

                color:
                  "var(--text)",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.borderColor =
                  "color-mix(in srgb,var(--accent-color) 40%,var(--border))";

                event.currentTarget.style.background =
                  "color-mix(in srgb,var(--accent-color) 10%,var(--surfaceHover))";

                event.currentTarget.style.color =
                  "var(--accent-color)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.borderColor =
                  "var(--border)";

                event.currentTarget.style.background =
                  "var(--surfaceHover)";

                event.currentTarget.style.color =
                  "var(--text)";
              }}
            >
              {item.label}
            </button>
          ),
        )}
      </div>
    </section>
  );
}