import { useMemo, useState } from "react";

import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

import type { QuizQuestion } from "../types/quiz.types";

interface QuizViewerProps {
  questions: QuizQuestion[];
}

export default function QuizViewer({
  questions,
}: QuizViewerProps) {
  const [current, setCurrent] =
    useState(0);

  const [answers, setAnswers] =
    useState<number[]>(
      Array(questions.length).fill(-1),
    );

  const [submitted, setSubmitted] =
    useState(false);

  const question =
    questions[current];

  function selectOption(
    index: number,
  ) {
    if (submitted) return;

    const copy = [...answers];

    copy[current] = index;

    setAnswers(copy);
  }

  const score = useMemo(() => {
    return answers.reduce(
      (
        total,
        answer,
        index,
      ) => {
        return (
          total +
          (answer ===
          questions[index]
            ?.correctAnswer
            ? 1
            : 0)
        );
      },
      0,
    );
  }, [answers, questions]);

  if (submitted) {
    return (
      <div className="space-y-8">

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">

          <h1 className="text-4xl font-bold text-white">
            Quiz Finished 🎉
          </h1>

          <p className="mt-6 text-6xl font-bold text-cyan-400">
            {score} / {questions.length}
          </p>

          <p className="mt-4 text-zinc-400">
            {Math.round(
              (score /
                questions.length) *
                100,
            )}
            %
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
            className="mt-10 inline-flex items-center gap-3 rounded-xl bg-cyan-500 px-8 py-3 font-medium text-white"
          >
            <RotateCcw />

            Retry Quiz

          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold text-white">
          Question {current + 1}
        </h2>

        <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-400">
          {current + 1} / {questions.length}
        </span>

      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">

        <h3 className="text-2xl font-semibold text-white">
          {question.question}
        </h3>

        <div className="mt-8 space-y-4">

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
                  className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition ${
                    selected
                      ? "border-cyan-500 bg-cyan-500/10"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <span>
                    {option}
                  </span>

                  {selected && (
                    <CheckCircle2
                      className="text-cyan-400"
                    />
                  )}

                </button>
              );
            },
          )}

        </div>

      </div>

      <div className="flex items-center justify-between">

        <button
          disabled={
            current === 0
          }
          onClick={() =>
            setCurrent(
              current - 1,
            )
          }
          className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-white disabled:opacity-30"
        >
          <ChevronLeft />

          Previous

        </button>

        {current ===
        questions.length - 1 ? (
          <button
            onClick={() =>
              setSubmitted(
                true,
              )
            }
            className="rounded-xl bg-emerald-500 px-8 py-3 font-medium text-white"
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
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-medium text-white"
          >
            Next

            <ChevronRight />

          </button>
        )}

      </div>

    </div>
  );
}