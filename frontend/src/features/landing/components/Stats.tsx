import {
  BookOpen,
  BrainCircuit,
  FileText,
  Zap,
} from "lucide-react";

import Section from "../../../components/ui/Section";

const stats = [
  {
    icon: FileText,
    value: "10M+",
    label: "Pages Processed",
  },
  {
    icon: BrainCircuit,
    value: "98%",
    label: "AI Accuracy",
  },
  {
    icon: BookOpen,
    value: "250K+",
    label: "Notes Generated",
  },
  {
    icon: Zap,
    value: "<3 sec",
    label: "Average Response",
  },
];

export default function Stats() {
  return (
    <Section>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition duration-300 hover:-translate-y-2 hover:border-violet-500/40"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
                <Icon className="h-7 w-7 text-violet-400" />
              </div>

              <h3 className="text-4xl font-bold text-white">
                {stat.value}
              </h3>

              <p className="mt-3 text-zinc-400">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}