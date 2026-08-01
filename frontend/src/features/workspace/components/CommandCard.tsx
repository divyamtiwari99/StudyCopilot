import type { LucideIcon } from "lucide-react";

interface CommandCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  loading?: boolean;
  onClick: () => void;
}

export default function CommandCard({
  icon: Icon,
  title,
  description,
  loading = false,
  onClick,
}: CommandCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-500/30 hover:bg-white/[0.06]">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
        <Icon size={22} />
      </div>

      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-400">
        {description}
      </p>

      <button
        onClick={onClick}
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-cyan-500 px-4 py-3 font-medium text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Generating..." : "Generate"}
      </button>
    </div>
  );
}