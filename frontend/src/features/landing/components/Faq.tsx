import { ChevronDown } from "lucide-react";

import Section from "../../../components/ui/Section";
import SectionHeading from "../../../components/ui/SectionHeading";

const faqs = [
  {
    question: "Is StudyCopilot free?",
    answer: "Yes. You can start with the free plan and upgrade anytime.",
  },
  {
    question: "Which file formats are supported?",
    answer: "PDF, DOCX, PPTX and TXT are supported.",
  },
  {
    question: "Can I generate quizzes and notes?",
    answer: "Yes. AI generates notes, quizzes and flashcards instantly.",
  },
  {
    question: "Do you store my documents?",
    answer: "Only your workspace stores uploaded documents securely.",
  },
];

export default function Faq() {
  return (
    <Section>
      <SectionHeading
        badge="FAQ"
        title="Frequently Asked"
        highlight="Questions"
        description="Everything you need to know."
      />

      <div className="mx-auto mt-16 max-w-4xl space-y-5">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {faq.question}
              </h3>

              <ChevronDown className="text-zinc-500" />
            </div>

            <p className="mt-4 leading-7 text-zinc-400">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}