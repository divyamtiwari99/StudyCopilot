import { motion } from "framer-motion";
import {
  Clock3,
  FileText,
  MoreVertical,
  Sparkles,
  Trash2,
  Pencil,
} from "lucide-react";
import { useState } from "react";

export interface Document {
  id: string;
  name: string;
  pages: number;
  size: string;
  uploadedAt: string;
  status: "processing" | "ready";
}

interface Props {
  document: Document;
}

export default function DocumentCard({ document }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl"
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/5 opacity-0 transition group-hover:opacity-100" />

      {/* Header */}
      <div className="flex items-start justify-between p-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
          <FileText size={28} />
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl p-2 transition hover:bg-white/10"
          >
            <MoreVertical size={18} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-12 z-20 w-44 rounded-2xl border border-white/10 bg-[#101319] p-2 shadow-2xl">
              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-white/5">
                <Pencil size={16} />
                Rename
              </button>

              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-400 hover:bg-red-500/10">
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="space-y-4 px-5 pb-5">
        <div>
          <h3 className="line-clamp-1 text-lg font-semibold">
            {document.name}
          </h3>

          <p className="mt-1 text-sm text-white/50">
            {document.pages} Pages • {document.size}
          </p>
        </div>

        {document.status === "ready" ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <Sparkles size={14} />
            AI Ready
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">
            <Clock3 size={14} className="animate-spin" />
            Processing...
          </div>
        )}

        <div className="h-px bg-white/10" />

        <div className="flex items-center justify-between text-xs text-white/40">
          <span>Uploaded</span>

          <span>{document.uploadedAt}</span>
        </div>
      </div>
    </motion.div>
  );
}