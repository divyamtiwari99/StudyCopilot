import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30">

      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl transition group-hover:bg-indigo-500/20" />

      <div className="relative z-10 flex items-start justify-between">

        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <h3 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h3>

          <p className="mt-3 text-sm text-slate-500">
            {subtitle}
          </p>
        </div>

        <div className="rounded-2xl bg-indigo-500/15 p-3">
          <Icon
            size={24}
            className="text-indigo-400"
          />
        </div>

      </div>
    </div>
  );
}