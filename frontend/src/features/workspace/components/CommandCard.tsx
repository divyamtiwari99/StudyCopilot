import {
  ArrowRight,
  Loader2,
  RotateCcw,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

interface CommandCardProps {
  icon: LucideIcon;

  title: string;

  description: string;

  loading?: boolean;

  generated?: boolean;

  onClick: () => void;

  onOpen?: () => void;
}

export default function CommandCard({
  icon: Icon,
  title,
  description,
  loading = false,
  generated = false,
  onClick,
  onOpen,
}: CommandCardProps) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_35px_rgba(34,211,238,0.12)]">

      {/* Glow */}

      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* Icon */}

      <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 transition group-hover:scale-110">
        <Icon size={24} />
      </div>

      {/* Title */}

      <h3 className="relative z-10 text-lg font-semibold text-white">
        {title}
      </h3>

      {/* Description */}

      <p className="relative z-10 mt-3 flex-1 text-sm leading-7 text-zinc-400">
        {description}
      </p>

      {/* Generated Badge */}

      {generated && (
        <div className="relative z-20 mt-4 inline-flex w-fit rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
          ✓ Generated
        </div>
      )}

      {/* Generate / Regenerate */}

      <button
        onClick={onClick}
        disabled={loading}
        className="relative z-20 mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />
            Generating...
          </>
        ) : generated ? (
          <>
            <RotateCcw size={18} />
            Regenerate
          </>
        ) : (
          <>
            <Sparkles size={18} />
            Generate
          </>
        )}
      </button>

      {/* Open */}

      {generated && onOpen && (
        <button
          onClick={onOpen}
          className="relative z-20 mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
        >
          Open

          <ArrowRight size={18} />
        </button>
      )}

    </div>
  );
}