import {
  useMemo,
  useState,
} from "react";

import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

import type {
  QuizQuestion,
} from "../types/quiz.types";

interface QuizViewerProps {
  questions: QuizQuestion[];
}

export default function QuizViewer({
  questions,
}: QuizViewerProps) {
  const [
    current,
    setCurrent,
  ] = useState(0);

  const [
    answers,
    setAnswers,
  ] = useState<number[]>(
    Array(questions.length).fill(-1),
  );

  const [
    submitted,
    setSubmitted,
  ] = useState(false);

  const question =
    questions[current];

  function selectOption(
    index: number,
  ) {
    if (submitted) {
      return;
    }

    const copy = [
      ...answers,
    ];

    copy[current] = index;

    setAnswers(copy);
  }

  const score = useMemo(() => {
    return answers.reduce(
      (
        total,
        answer,
        index,
      ) =>
        total +
        (
          answer ===
          questions[index]
            ?.correctAnswer
            ? 1
            : 0
        ),
      0,
    );
  }, [
    answers,
    questions,
  ]);

  if (submitted) {
    const percentage =
      questions.length === 0
        ? 0
        : Math.round(
            (score /
              questions.length) *
              100,
          );

    return (
      <div
        className="
          rounded-3xl
          border
          p-10
          text-center
          backdrop-blur-xl
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
            mx-auto
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
          "
          style={{
            background:
              "color-mix(in srgb,var(--accent-color) 10%,transparent)",

            color:
              "var(--accent-color)",
          }}
        >
          <CheckCircle2
            size={32}
          />
        </div>

        <h1
          className="
            mt-5
            text-4xl
            font-bold
            tracking-tight
          "
          style={{
            color:
              "var(--text)",
          }}
        >
          Quiz Finished 🎉
        </h1>

        <p
          className="
            mt-6
            text-6xl
            font-bold
          "
          style={{
            color:
              "var(--accent-color)",
          }}
        >
          {score} / {questions.length}
        </p>

        <p
          className="
            mt-4
            text-lg
            font-medium
          "
          style={{
            color:
              "var(--muted)",
          }}
        >
          {percentage}%
        </p>

        <button
          onClick={() => {
            setSubmitted(false);

            setCurrent(0);

            setAnswers(
              Array(
                questions.length,
              ).fill(-1),
            );
          }}
          type="button"
          className="
            mt-10
            inline-flex
            items-center
            gap-3
            rounded-xl
            px-8
            py-3
            font-semibold
            text-white
            transition-all
            duration-200
            hover:-translate-y-0.5
          "
          style={{
            background:
              "var(--accent-color)",

            boxShadow:
              "0 10px 24px color-mix(in srgb,var(--accent-color) 20%,transparent)",
          }}
        >
          <RotateCcw
            size={18}
          />

          Retry Quiz
        </button>
      </div>
    );
  }

  if (!question) {
    return (
      <div
        className="
          rounded-3xl
          border
          p-10
          text-center
        "
        style={{
          borderColor:
            "var(--border)",

          background:
            "var(--surface)",

          color:
            "var(--muted)",
        }}
      >
        No quiz questions
        available.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <h2
          className="
            text-2xl
            font-bold
          "
          style={{
            color:
              "var(--text)",
          }}
        >
          Question {current + 1}
        </h2>

        <span
          className="
            rounded-full
            border
            px-4
            py-2
            text-sm
            font-medium
          "
          style={{
            background:
              "color-mix(in srgb,var(--accent-color) 10%,transparent)",

            borderColor:
              "color-mix(in srgb,var(--accent-color) 20%,var(--border))",

            color:
              "var(--accent-color)",
          }}
        >
          {current + 1} /{" "}
          {questions.length}
        </span>
      </div>

      {/* Question Card */}

      <div
        className="
          rounded-3xl
          border
          p-8
          backdrop-blur-xl
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
        <h3
          className="
            text-2xl
            font-semibold
            leading-relaxed
          "
          style={{
            color:
              "var(--text)",
          }}
        >
          {question.question}
        </h3>

        {/* Options */}

        <div
          className="
            mt-8
            space-y-4
          "
        >
          {question.options.map(
            (
              option,
              index,
            ) => {
              const selected =
                answers[current] ===
                index;

              return (
                <button
                  key={index}
                  onClick={() =>
                    selectOption(
                      index,
                    )
                  }
                  type="button"
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    p-5
                    text-left
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                  "
                  style={{
                    borderColor:
                      selected
                        ? "var(--accent-color)"
                        : "var(--border)",

                    background:
                      selected
                        ? "color-mix(in srgb,var(--accent-color) 10%,transparent)"
                        : "var(--surfaceHover)",

                    color:
                      "var(--text)",

                    boxShadow:
                      selected
                        ? "0 8px 24px color-mix(in srgb,var(--accent-color) 8%,transparent)"
                        : "none",
                  }}
                  onMouseEnter={(
                    event,
                  ) => {
                    if (!selected) {
                      event.currentTarget.style.borderColor =
                        "color-mix(in srgb,var(--accent-color) 28%,var(--border))";
                    }
                  }}
                  onMouseLeave={(
                    event,
                  ) => {
                    if (!selected) {
                      event.currentTarget.style.borderColor =
                        "var(--border)";
                    }
                  }}
                >
                  <span>
                    {option}
                  </span>

                  {selected && (
                    <CheckCircle2
                      size={20}
                      style={{
                        color:
                          "var(--accent-color)",
                      }}
                    />
                  )}
                </button>
              );
            },
          )}
        </div>
      </div>

      {/* Navigation */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        {/* Previous */}

        <button
          disabled={
            current === 0
          }
          onClick={() =>
            setCurrent(
              current - 1,
            )
          }
          type="button"
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            px-6
            py-3
            font-medium
            transition-all
            duration-200
            hover:-translate-y-0.5
            disabled:cursor-not-allowed
            disabled:opacity-30
          "
          style={{
            borderColor:
              "var(--border)",

            background:
              "var(--surface)",

            color:
              "var(--text)",
          }}
        >
          <ChevronLeft
            size={18}
          />

          Previous
        </button>

        {/* Next / Finish */}

        {current ===
        questions.length - 1 ? (
          <button
            onClick={() =>
              setSubmitted(true)
            }
            type="button"
            className="
              rounded-xl
              px-8
              py-3
              font-semibold
              text-white
              transition-all
              duration-200
              hover:-translate-y-0.5
            "
            style={{
              background:
                "var(--accent-color)",

              boxShadow:
                "0 10px 24px color-mix(in srgb,var(--accent-color) 20%,transparent)",
            }}
          >
            Finish Quiz
          </button>
        ) : (
          <button
            onClick={() =>
              setCurrent(
                current + 1,
              )
            }
            type="button"
            className="
              flex
              items-center
              gap-2
              rounded-xl
              px-6
              py-3
              font-semibold
              text-white
              transition-all
              duration-200
              hover:-translate-y-0.5
            "
            style={{
              background:
                "var(--accent-color)",

              boxShadow:
                "0 10px 24px color-mix(in srgb,var(--accent-color) 20%,transparent)",
            }}
          >
            Next

            <ChevronRight
              size={18}
            />
          </button>
        )}
      </div>
    </div>
  );
}