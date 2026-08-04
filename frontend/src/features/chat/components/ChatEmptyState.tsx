import {
  ArrowRight,
  BookOpen,
  Brain,
  FileText,
  Layers3,
  Sparkles,
} from "lucide-react";

interface Props {
  onQuestion: (
    question: string,
  ) => void;
}

const actions = [
  {
    icon: BookOpen,
    title: "Summarize",
    description:
      "Generate a complete study summary.",
    prompt:
      "Summarize this document.",
  },
  {
    icon: Brain,
    title: "Explain",
    description:
      "Explain the important concepts.",
    prompt:
      "Explain the main concepts in simple language.",
  },
  {
    icon: Layers3,
    title: "Flashcards",
    description:
      "Create revision flashcards.",
    prompt:
      "Generate flashcards from this document.",
  },
  {
    icon: FileText,
    title: "Notes",
    description:
      "Generate study notes.",
    prompt:
      "Create revision notes.",
  },
];

export default function ChatEmptyState({
  onQuestion,
}: Props) {
  return (
    <div className="flex h-full items-center justify-center px-8 py-10">

      <div className="w-full max-w-4xl">

        {/* Hero */}

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20">

            <Sparkles
              size={30}
              className="text-indigo-400"
            />

          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">

            Welcome to StudyCopilot

          </h1>

          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-400">

            Ask questions, create summaries,
            notes, quizzes and learn faster
            with AI.

          </p>

        </div>

        {/* Cards */}

        <div className="mt-10 grid gap-4 md:grid-cols-2">

          {actions.map(
            (action) => {

              const Icon =
                action.icon;

              return (

                <button
                  key={action.title}
                  onClick={() =>
                    onQuestion(
                      action.prompt,
                    )
                  }
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-indigo-500/10"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10">

                      <Icon
                        size={20}
                        className="text-indigo-400"
                      />

                    </div>

                    <ArrowRight
                      size={18}
                      className="text-slate-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-indigo-400"
                    />

                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-white">

                    {action.title}

                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">

                    {action.description}

                  </p>

                </button>

              );

            },
          )}

        </div>

        {/* Tip */}

        <div className="mt-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-5 py-4">

          <p className="text-sm leading-6 text-indigo-100">

            💡 Try asking:
            <span className="font-medium text-white">
              {" "}
              "Explain Binary Search with an example"
            </span>

          </p>

        </div>

      </div>

    </div>
  );
}