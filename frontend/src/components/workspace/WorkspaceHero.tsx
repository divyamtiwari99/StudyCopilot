import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  HardDrive,
  Sparkles,
  Upload,
} from "lucide-react";

import Button from "../ui/Button";

import type { DashboardStats } from "@/features/dashboard/hooks/useDashboard";

interface Props {
  dashboard: {
    stats: DashboardStats;
  };
}

export default function WorkspaceHero({
  dashboard,
}: Props) {
  const navigate = useNavigate();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning";
    }

    if (hour < 18) {
      return "Good Afternoon";
    }

    return "Good Evening";
  }, []);

  const { stats } = dashboard;

  return (
    <section className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] backdrop-blur-3xl">

      <div className="grid lg:grid-cols-[1.7fr_360px]">

        {/* Left */}

        <div className="p-10">

          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">

            <Sparkles size={15} />

            Dashboard

          </div>

          <h1 className="mt-6 text-5xl font-black text-white">

            {greeting} 👋

          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">

            Ready to continue learning?
            Upload new material or continue chatting
            with your existing documents.

          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Button
              size="lg"
              className="gap-3"
              onClick={() =>
                navigate("/dashboard/documents")
              }
            >

              <Upload size={20} />

              Upload Document

            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="gap-3"
              onClick={() =>
                navigate("/dashboard/chat")
              }
            >

              <BrainCircuit size={20} />

              Continue Chat

              <ArrowRight size={18} />

            </Button>

          </div>

        </div>

        {/* Right */}

        <div className="grid gap-px border-l border-white/10 bg-white/5">

          <Stat
            icon={CheckCircle2}
            label="Ready Documents"
            value={stats.readyDocuments.toString()}
          />

          <Stat
            icon={Clock3}
            label="Processing"
            value={stats.processingDocuments.toString()}
          />

          <Stat
            icon={Sparkles}
            label="Total Documents"
            value={stats.totalDocuments.toString()}
          />

          <Stat
            icon={HardDrive}
            label="Storage Used"
            value={stats.totalStorageLabel}
          />

        </div>

      </div>

    </section>
  );
}

interface StatProps {
  icon: typeof Sparkles;

  label: string;

  value: string;
}

function Stat({
  icon: Icon,
  label,
  value,
}: StatProps) {
  return (
    <div className="flex items-center gap-4 border-b border-white/10 p-6 last:border-b-0">

      <div className="rounded-2xl bg-indigo-500/15 p-3">

        <Icon
          size={22}
          className="text-indigo-400"
        />

      </div>

      <div>

        <p className="text-sm text-slate-400">

          {label}

        </p>

        <h3 className="mt-1 text-2xl font-bold text-white">

          {value}

        </h3>

      </div>

    </div>
  );
}