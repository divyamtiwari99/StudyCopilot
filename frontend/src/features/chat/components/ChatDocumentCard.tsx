import { Link } from "react-router-dom";

import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  FileText,
  XCircle,
} from "lucide-react";

export interface ChatDocument {
  id: string;

  title: string;

  pages: number;

  size: string;

  status:
    | "uploading"
    | "processing"
    | "completed"
    | "failed";
}

interface Props {
  document: ChatDocument;
}

function StatusBadge({
  status,
}: {
  status: ChatDocument["status"];
}) {
  switch (status) {
    case "uploading":
      return (
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400">
          <Clock3
            size={14}
            className="animate-pulse"
          />

          Uploading
        </div>
      );

    case "processing":
      return (
        <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">
          <Clock3
            size={14}
            className="animate-spin"
          />

          Processing
        </div>
      );

    case "failed":
      return (
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
          <XCircle size={14} />

          Failed
        </div>
      );

    case "completed":
      return (
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
          <CheckCircle2 size={14} />

          AI Ready
        </div>
      );

    default:
      return null;
  }
}

export default function ChatDocumentCard({
  document,
}: Props) {
  return (
    <div className="group rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-3xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white/[0.06]">

      <div className="flex items-start justify-between">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
          <FileText size={28} />
        </div>

        <StatusBadge
          status={document.status}
        />

      </div>

      <h3 className="mt-6 line-clamp-1 text-xl font-semibold text-white">
        {document.title}
      </h3>

      <p className="mt-2 text-sm text-slate-400">
        {document.pages} Pages • {document.size}
      </p>

      <div className="mt-8">

        <Link
          to={`/dashboard/chat/${document.id}`}
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-3 font-semibold text-white transition hover:scale-[1.02]"
        >

          <BrainCircuit size={18} />

          Start AI Chat

          <ArrowRight size={18} />

        </Link>

      </div>

    </div>
  );
}