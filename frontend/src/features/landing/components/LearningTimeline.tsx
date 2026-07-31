import {
  BrainCircuit,
  FileText,
  GraduationCap,
  NotebookPen,
  Sparkles,
} from "lucide-react";

import Section from "../../../components/ui/Section";
import SectionHeading from "../../../components/ui/SectionHeading";

const timeline = [
  {
    icon: FileText,
    title: "Upload Document",
    description: "Upload your PDFs, notes or study material.",
  },
  {
    icon: BrainCircuit,
    title: "AI Analysis",
    description: "StudyCopilot understands concepts and relationships.",
  },
  {
    icon: NotebookPen,
    title: "Smart Notes",
    description: "Generate structured notes with one click.",
  },
  {
    icon: GraduationCap,
    title: "Practice",
    description: "AI creates quizzes and flashcards automatically.",
  },
  {
    icon: Sparkles,
    title: "Master Topic",
    description: "Track progress and revise only weak concepts.",
  },
];

export default function LearningTimeline() {
  return (
    <Section>
      <SectionHeading
        badge="Learning Journey"
        title="From Upload"
        highlight="To Mastery"
        description="See how StudyCopilot transforms your study workflow."
      />

      <div className="relative mx-auto mt-20 max-w-5xl">

        <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-violet-500 via-violet-400 to-transparent" />

        <div className="space-y-10">
          {timeline.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="relative flex gap-8"
              >
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg">
                  <Icon className="h-7 w-7" />
                </div>

                <div className="flex-1 rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:border-violet-500/40 hover:bg-white/[0.06]">
                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-zinc-400">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}