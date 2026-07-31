import { ArrowRight } from "lucide-react";

import Section from "../../../components/ui/Section";

export default function Cta() {
  return (
    <Section>
      <div className="rounded-[40px] border border-violet-500/20 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10 p-16 text-center">
        <h2 className="text-5xl font-bold text-white">
          Ready to study smarter?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300">
          Join thousands of students using AI to learn faster.
        </p>

        <button className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white transition hover:bg-violet-500">
          Get Started
          <ArrowRight size={20} />
        </button>
      </div>
    </Section>
  );
}