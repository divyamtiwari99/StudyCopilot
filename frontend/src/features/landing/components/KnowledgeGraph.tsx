import {
  BrainCircuit,
  Database,
  GitBranch,
  Network,
} from "lucide-react";

import Section from "../../../components/ui/Section";
import SectionHeading from "../../../components/ui/SectionHeading";

const nodes = [
  {
    title: "Operating System",
    icon: BrainCircuit,
    position: "top-6 left-1/2 -translate-x-1/2",
  },
  {
    title: "Processes",
    icon: GitBranch,
    position: "top-44 left-8",
  },
  {
    title: "Memory",
    icon: Database,
    position: "top-44 right-8",
  },
  {
    title: "Virtual Memory",
    icon: Network,
    position: "bottom-8 left-1/2 -translate-x-1/2",
  },
];

export default function KnowledgeGraph() {
  return (
    <Section>
      <SectionHeading
        badge="AI Knowledge Graph"
        title="AI Connects"
        highlight="Everything"
        description="StudyCopilot understands relationships instead of isolated pages."
      />

      <div className="relative mt-20 h-[520px] overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-xl">

        <svg className="absolute inset-0 h-full w-full">
          <line
            x1="50%"
            y1="12%"
            x2="18%"
            y2="46%"
            stroke="#5b21b6"
            strokeOpacity="0.5"
          />

          <line
            x1="50%"
            y1="12%"
            x2="82%"
            y2="46%"
            stroke="#5b21b6"
            strokeOpacity="0.5"
          />

          <line
            x1="18%"
            y1="46%"
            x2="50%"
            y2="88%"
            stroke="#5b21b6"
            strokeOpacity="0.5"
          />

          <line
            x1="82%"
            y1="46%"
            x2="50%"
            y2="88%"
            stroke="#5b21b6"
            strokeOpacity="0.5"
          />
        </svg>

        {nodes.map((node) => {
          const Icon = node.icon;

          return (
            <div
              key={node.title}
              className={`absolute ${node.position}`}
            >
              <div className="flex w-52 flex-col items-center rounded-3xl border border-violet-500/20 bg-zinc-950/90 p-5 shadow-xl transition duration-300 hover:scale-105">
                <div className="mb-4 rounded-2xl bg-violet-600/20 p-3">
                  <Icon className="h-6 w-6 text-violet-400" />
                </div>

                <h3 className="font-semibold text-white">
                  {node.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}