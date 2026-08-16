import {
  BrainCircuit,
  FileText,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

import Section from "../../../components/ui/Section";
import SectionHeading from "../../../components/ui/SectionHeading";

const highlights = [
  {
    title: "Understand your material",
    description:
      "Chat with uploaded documents and get contextual explanations from the study material in your workspace.",
    icon: BrainCircuit,
  },
  {
    title: "Turn content into revision material",
    description:
      "Generate structured notes, summaries and flashcards from the documents you are already studying.",
    icon: FileText,
  },
  {
    title: "Practice what you learned",
    description:
      "Use quizzes, knowledge graphs and learning plans to move from reading to active revision.",
    icon: Sparkles,
  },
];

export default function Testimonials() {
  return (
    <Section>
      <SectionHeading
        badge="Why StudyCopilot"
        title="A workflow built"
        highlight="for learning"
        description="Understand, organize and practice your study material without switching between multiple tools."
      />

      <div className="mt-20 grid gap-8 lg:grid-cols-3">
        {highlights.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.1,
              }}
              className="
                group
                rounded-3xl
                border
                border-[var(--border)]
                bg-[color-mix(in_srgb,var(--surface)_70%,transparent)]
                p-8
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-[color-mix(in_srgb,var(--accent-color)_40%,var(--border))]
                hover:bg-[color-mix(in_srgb,var(--surface)_85%,transparent)]
              "
            >
              <div
                className="
                  mb-6
                  flex
                  h-14
                  w-14
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
                <Icon size={26} />
              </div>

              <h3
                className="
                  text-2xl
                  font-semibold
                "
                style={{
                  color: "var(--text)",
                }}
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-4
                  leading-7
                "
                style={{
                  color: "var(--muted)",
                }}
              >
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
