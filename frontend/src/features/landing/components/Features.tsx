import Section from "../../../components/ui/Section";
import SectionHeading from "../../../components/ui/SectionHeading";

const features = [
  {
    title: "AI Document Chat",
    description:
      "Ask questions from multiple PDFs and receive contextual answers instantly.",
    icon: "💬",
  },
  {
    title: "Smart Notes",
    description:
      "Generate structured notes with key concepts, summaries and highlights.",
    icon: "📝",
  },
  {
    title: "Adaptive Quiz",
    description:
      "AI creates quizzes based on your understanding and previous performance.",
    icon: "🎯",
  },
  {
    title: "Flashcards",
    description:
      "Convert chapters into beautiful flashcards for quick revision.",
    icon: "🃏",
  },
  {
    title: "Learning Analytics",
    description:
      "Track progress, weak topics and study consistency with AI insights.",
    icon: "📈",
  },
  {
    title: "Knowledge Graph",
    description:
      "Visualize how concepts connect across all your study materials.",
    icon: "🧠",
  },
];

export default function Features() {
  return (
    <Section id="features">
      <SectionHeading
        badge="Features"
        title="Everything You Need To"
        highlight="Study Better"
        description="One workspace for reading, understanding, revising and mastering your subjects with AI."
      />

      <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/40 hover:bg-white/10"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15 text-3xl">
              {feature.icon}
            </div>

            <h3 className="text-2xl font-semibold text-white">
              {feature.title}
            </h3>

            <p className="mt-4 leading-7 text-zinc-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}