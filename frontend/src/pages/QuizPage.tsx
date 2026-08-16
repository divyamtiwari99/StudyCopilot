import { useParams } from "react-router-dom";

import QuizViewer from "@/features/quiz/components/QuizViewer";

import {
  useQuiz,
} from "@/features/quiz/hooks/useQuiz";

export default function QuizPage() {
  const { contentId } =
    useParams();

  const {
    data,
    isLoading,
    isError,
  } = useQuiz(contentId);

  if (isLoading) {
    return (
      <div
        className="
          flex
          h-80
          flex-col
          items-center
          justify-center
          gap-4
          rounded-3xl
          border
        "
        style={{
          borderColor:
            "var(--border)",

          background:
            "var(--surface)",

          boxShadow:
            "var(--shadow-card)",
        }}
      >
        <div
          className="
            h-10
            w-10
            animate-spin
            rounded-full
            border-2
            border-transparent
          "
          style={{
            borderTopColor:
              "var(--accent-color)",

            borderRightColor:
              "color-mix(in srgb,var(--accent-color) 35%,transparent)",
          }}
        />

        <p
          className="
            text-sm
            font-medium
          "
          style={{
            color:
              "var(--muted)",
          }}
        >
          Loading quiz...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
          flex
          h-80
          items-center
          justify-center
        "
      >
        <p
          style={{
            color:
              "var(--danger)",
          }}
        >
          Failed to load quiz.
        </p>
      </div>
    );
  }

  if (
    !data ||
    !Array.isArray(data.json) ||
    data.json.length === 0
  ) {
    return (
      <div
        className="
          flex
          h-80
          flex-col
          items-center
          justify-center
          space-y-4
          rounded-3xl
          border
          border-dashed
        "
        style={{
          borderColor:
            "var(--border)",

          background:
            "var(--surface)",

          boxShadow:
            "var(--shadow-card)",
        }}
      >
        <h2
          className="
            text-2xl
            font-semibold
          "
          style={{
            color:
              "var(--text)",
          }}
        >
          No Quiz Found
        </h2>

        <p
          className="
            max-w-md
            text-center
            leading-6
          "
          style={{
            color:
              "var(--muted)",
          }}
        >
          Generate a quiz from the AI
          Command Center above to start
          practicing.
        </p>
      </div>
    );
  }

  return (
    <QuizViewer
      questions={data.json}
    />
  );
}