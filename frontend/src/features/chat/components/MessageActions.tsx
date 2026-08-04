import {
  Check,
  Copy,
  Share2,
  RotateCcw,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

interface Props {
  copied: boolean;

  onCopy: () => void;
}

export default function MessageActions({
  copied,
  onCopy,
}: Props) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">

      <button
        onClick={onCopy}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300 transition-all hover:border-indigo-500/30 hover:bg-indigo-500/10"
      >
        {copied ? (
          <>
            <Check size={16} />
            Copied
          </>
        ) : (
          <>
            <Copy size={16} />
            Copy
          </>
        )}
      </button>

      <button
        className="rounded-xl border border-white/10 bg-white/[0.03] p-2 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/10"
      >
        <ThumbsUp size={16} />
      </button>

      <button
        className="rounded-xl border border-white/10 bg-white/[0.03] p-2 transition-all hover:border-red-500/30 hover:bg-red-500/10"
      >
        <ThumbsDown size={16} />
      </button>

      <button
        className="rounded-xl border border-white/10 bg-white/[0.03] p-2 transition-all hover:border-cyan-500/30 hover:bg-cyan-500/10"
      >
        <RotateCcw size={16} />
      </button>

      <button
        className="rounded-xl border border-white/10 bg-white/[0.03] p-2 transition-all hover:border-violet-500/30 hover:bg-violet-500/10"
      >
        <Share2 size={16} />
      </button>

    </div>
  );
}