import {
  ArrowRight,
  BrainCircuit,
  FileText,
  NotebookPen,
  Sparkles,
} from "lucide-react";

import Section from "../../../components/ui/Section";
import SectionHeading from "../../../components/ui/SectionHeading";

const steps = [
  {
    icon: FileText,
    title: "Upload",
    description:
      "Drop PDFs, notes or study material into your workspace.",
  },
  {
    icon: BrainCircuit,
    title: "AI Understands",
    description:
      "StudyCopilot analyzes content and builds contextual knowledge.",
  },
  {
    icon: NotebookPen,
    title: "Learn",
    description:
      "Generate notes, summaries and explanations instantly.",
  },
  {
    icon: Sparkles,
    title: "Master",
    description:
      "Practice with quizzes and flashcards until you remember everything.",
  },
];

export default function HowItWorks() {
  return (
    <Section>
      <SectionHeading
        badge="Workflow"
        title="How StudyCopilot"
        highlight="Works"
        description="Four simple steps from document to mastery."
      />

      <div className="mt-20 grid gap-8 lg:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition duration-300 hover:-translate-y-2 hover:border-violet-500/40"
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
                <Icon className="h-8 w-8 text-violet-400" />
              </div>

              <div className="mb-4 text-sm font-medium text-violet-400">
                Step {index + 1}
              </div>

              <h3 className="text-2xl font-semibold text-white">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                {step.description}
              </p>

              {index !== steps.length - 1 && (
                <ArrowRight className="absolute -right-5 top-1/2 hidden h-6 w-6 text-zinc-600 lg:block" />
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}