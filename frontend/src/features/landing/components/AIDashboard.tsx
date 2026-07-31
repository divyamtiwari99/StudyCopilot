import {
  BrainCircuit,
  FileText,
  GraduationCap,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import Section from "../../../components/ui/Section";
import SectionHeading from "../../../components/ui/SectionHeading";

export default function AIDashboard() {
  return (
    <Section>
      <SectionHeading
        badge="AI Workspace"
        title="Everything You Need"
        highlight="In One Dashboard"
        description="No switching between apps. Everything lives inside StudyCopilot."
      />

      <div className="mt-20 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Main Panel */}

        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">

          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">
              AI Workspace
            </h3>

            <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm text-green-400">
              Online
            </span>
          </div>

          <div className="space-y-5">

            <div className="rounded-2xl bg-zinc-900 p-5">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-violet-400" />
                <span className="text-white">
                  DBMS.pdf uploaded
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-violet-600/15 p-5">
              <div className="flex items-center gap-3">
                <BrainCircuit className="h-5 w-5 text-violet-400" />
                <span className="text-white">
                  AI generated summary in 3.2 sec
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-zinc-900 p-5">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-violet-400" />
                <span className="text-white">
                  Quiz generated (20 Questions)
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Cards */}

        <div className="space-y-8">

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
            <Sparkles className="mb-4 h-8 w-8 text-violet-400" />

            <h3 className="text-2xl font-semibold text-white">
              Smart Notes
            </h3>

            <p className="mt-3 text-zinc-400">
              AI creates structured notes automatically.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
            <TrendingUp className="mb-4 h-8 w-8 text-violet-400" />

            <h3 className="text-2xl font-semibold text-white">
              Progress
            </h3>

            <p className="mt-3 text-zinc-400">
              Track learning with AI powered analytics.
            </p>
          </div>

        </div>

      </div>
    </Section>
  );
}