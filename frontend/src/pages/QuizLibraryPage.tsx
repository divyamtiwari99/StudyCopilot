import {
  Brain,
  Sparkles,
} from "lucide-react";

import QuizCard from "@/features/quiz/components/QuizCard";

import {
  useAllQuiz,
} from "@/features/quiz/hooks/useAllQuiz";

export default function QuizLibraryPage() {
  const {
    data: quizzes,
    isLoading,
    isError,
  } = useAllQuiz();

  if (isLoading) {
    return (
      <div
        className="
          flex
          min-h-[400px]
          items-center
          justify-center
          rounded-3xl
          border
          backdrop-blur-xl
        "
        style={{
          borderColor:
            "var(--border)",

          background:
            "var(--surface)",

          color:
            "var(--muted)",

          boxShadow:
            "var(--shadow-card)",
        }}
      >
        Loading quizzes...
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
          flex
          min-h-[400px]
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          p-10
          text-center
        "
        style={{
          borderColor:
            "color-mix(in srgb,var(--danger) 25%,var(--border))",

          background:
            "color-mix(in srgb,var(--danger) 7%,var(--surface))",

          boxShadow:
            "var(--shadow-card)",
        }}
      >
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
          "
          style={{
            background:
              "color-mix(in srgb,var(--danger) 10%,transparent)",

            color:
              "var(--danger)",
          }}
        >
          <Brain size={32} />
        </div>

        <h2
          className="
            mt-5
            text-2xl
            font-semibold
          "
          style={{
            color:
              "var(--text)",
          }}
        >
          Failed to load quizzes
        </h2>

        <p
          className="
            mt-2
            max-w-md
            text-sm
            leading-6
          "
          style={{
            color:
              "var(--muted)",
          }}
        >
          Something went wrong while
          loading your quiz library.
        </p>
      </div>
    );
  }

  if (
    !quizzes ||
    quizzes.length === 0
  ) {
    return (
      <div
        className="
          flex
          min-h-[450px]
          flex-col
          items-center
          justify-center
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
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
          "
          style={{
            background:
              "color-mix(in srgb,var(--accent-color) 9%,transparent)",

            color:
              "var(--accent-color)",
          }}
        >
          <Brain size={32} />
        </div>

        <h2
          className="
            mt-5
            text-2xl
            font-bold
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
            mt-3
            max-w-md
            leading-6
          "
          style={{
            color:
              "var(--muted)",
          }}
        >
          Generate quizzes from your
          document workspace using the
          AI Command Center.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div
        className="
          relative
          overflow-hidden
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
        {/* Accent Glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-48
            w-48
            rounded-full
            blur-3xl
            opacity-10
          "
          style={{
            background:
              "var(--accent-color)",
          }}
        />

        <div
          className="
            relative
            z-10
            flex
            items-center
            gap-4
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              transition-transform
              duration-300
              hover:scale-105
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
            <Sparkles
              size={26}
            />
          </div>

          <div className="min-w-0">
            <h1
              className="
                text-3xl
                font-bold
                tracking-tight
              "
              style={{
                color:
                  "var(--text)",
              }}
            >
              Quiz Library
            </h1>

            <p
              className="
                mt-1
                text-sm
                leading-6
              "
              style={{
                color:
                  "var(--muted)",
              }}
            >
              Practice and test your
              knowledge from generated
              quizzes.
            </p>
          </div>
        </div>

        {/* Quiz Count */}

        <div
          className="
            relative
            z-10
            mt-6
            inline-flex
            items-center
            rounded-xl
            border
            px-4
            py-2
            text-sm
            font-medium
          "
          style={{
            borderColor:
              "var(--border)",

            background:
              "var(--surfaceHover)",

            color:
              "var(--muted)",
          }}
        >
          {quizzes.length} Quiz
          {quizzes.length !== 1 &&
            "zes"}
        </div>
      </div>

      {/* Quiz Grid */}

      <div
        className="
          grid
          gap-5
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {quizzes.map(
          (quiz) => (
            <QuizCard
              key={quiz._id}
              quiz={quiz}
            />
          ),
        )}
      </div>
    </div>
  );
}