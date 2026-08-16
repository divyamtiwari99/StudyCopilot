import { Check, LockKeyhole, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Section from "../../../components/ui/Section";
import SectionHeading from "../../../components/ui/SectionHeading";

const capabilities = [
  "Document upload and AI chat",
  "AI notes and summaries",
  "Flashcards and quizzes",
  "Knowledge graph and roadmap",
  "Study planner workspace",
];

export default function Pricing() {
  return (
    <Section id="pricing">
      <SectionHeading
        badge="Access"
        title="Start with the"
        highlight="workspace"
        description="The current frontend exposes the core StudyCopilot learning workflow. Subscription checkout and invoice APIs are not connected yet, so we do not invent prices or payment states."
      />

      <div className="mx-auto mt-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[36px] border p-8 md:p-10"
          style={{
            borderColor: "color-mix(in srgb,var(--accent-color) 35%,var(--border))",
            background: "linear-gradient(135deg,color-mix(in srgb,var(--accent-color) 10%,var(--surface)),var(--surface))",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]" style={{ borderColor: "color-mix(in srgb,var(--accent-color) 25%,var(--border))", color: "var(--accent-color)" }}>
                <Sparkles size={14} />
                Core workspace
              </div>
              <h3 className="mt-5 text-3xl font-black" style={{ color: "var(--text)" }}>
                StudyCopilot learning suite
              </h3>
              <p className="mt-3 max-w-xl leading-7" style={{ color: "var(--muted)" }}>
                Upload your material, ask questions and turn the same document into multiple revision formats from one workspace.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border px-5 py-4 text-center" style={{ borderColor: "var(--border)", background: "var(--surfaceHover)" }}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
                Availability
              </p>
              <p className="mt-1 text-lg font-bold" style={{ color: "var(--text)" }}>
                Available now
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {capabilities.map((feature) => (
              <div key={feature} className="flex items-center gap-3 rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surfaceHover)" }}>
                <Check size={18} style={{ color: "var(--success)" }} />
                <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-dashed p-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "var(--border)", background: "color-mix(in srgb,var(--surface) 70%,transparent)" }}>
            <div className="flex items-start gap-3">
              <LockKeyhole size={18} className="mt-0.5 shrink-0" style={{ color: "var(--muted)" }} />
              <p className="text-sm leading-6" style={{ color: "var(--muted)" }}>
                Subscription checkout, invoices and team billing are not exposed by the current API contract.
              </p>
            </div>
            <Link to="/register" className="inline-flex shrink-0 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5" style={{ background: "var(--accent-color)" }}>
              Create Account
            </Link>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
