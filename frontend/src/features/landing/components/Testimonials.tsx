import { Quote } from "lucide-react";

import Section from "../../../components/ui/Section";
import SectionHeading from "../../../components/ui/SectionHeading";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Computer Science Student",
    quote:
      "StudyCopilot helped me prepare for finals in half the usual time. The AI explanations feel like having a personal tutor.",
  },
  {
    name: "Sarah Lee",
    role: "Medical Student",
    quote:
      "The quiz and flashcard generation saved me hours every week. Everything stays organized in one place.",
  },
  {
    name: "Rahul Sharma",
    role: "Engineering Student",
    quote:
      "The knowledge graph makes it much easier to understand how concepts are connected instead of memorizing isolated topics.",
  },
];

export default function Testimonials() {
  return (
    <Section>
      <SectionHeading
        badge="Testimonials"
        title="Loved by"
        highlight="Students"
        description="Built for learners who want to study smarter."
      />

      <div className="mt-20 grid gap-8 lg:grid-cols-3">
        {testimonials.map((item) => (
          <div
            key={item.name}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition hover:-translate-y-2 hover:border-violet-500/40"
          >
            <Quote className="mb-6 h-8 w-8 text-violet-400" />

            <p className="leading-8 text-zinc-300">
              "{item.quote}"
            </p>

            <div className="mt-8">
              <h3 className="font-semibold text-white">
                {item.name}
              </h3>

              <p className="text-sm text-zinc-500">
                {item.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}