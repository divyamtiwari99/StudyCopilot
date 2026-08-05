import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { useDeleteDocument } from "@/features/dashboard/hooks/useDeleteDocument";
import { useRenameDocument } from "@/features/dashboard/hooks/useRenameDocument";
import {
  CheckCircle2,
  Clock3,
  FileText,
  MoreVertical,
  Pencil,
  Trash2,
  UploadCloud,
  XCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import {
  useRef,
  useState,
} from "react";

import { useClickOutside } from "@/hooks/useClickOutside";

export interface Document {
  id: string;

  name: string;

  pages: number;

  size: string;

  uploadedAt: string;

  status:
  | "uploading"
  | "processing"
  | "ready"
  | "failed";
}

interface Props {
  document: Document;
}

export default function DocumentCard({
  document,
}: Props) {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  useClickOutside(
    menuRef,
    () => {
      setMenuOpen(false);
    },
  );



  const deleteMutation =
    useDeleteDocument();

  const renameMutation =
    useRenameDocument();

  const [
    renameOpen,
    setRenameOpen,
  ] = useState(false);

  const [
    confirmDelete,
    setConfirmDelete,
  ] = useState(false);

  const [
    title,
    setTitle,
  ] = useState(document.name);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  async function handleRename() {
    if (!title.trim()) {
      toast.error(
        "Document title is required.",
      );

      return;
    }

    try {
      await renameMutation.mutateAsync({
        id: document.id,
        title: title.trim(),
      });

      setRenameOpen(false);

      setMenuOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    try {
      setDeleting(true);

      await deleteMutation.mutateAsync(
        document.id,
      );

      setConfirmDelete(false);

      setMenuOpen(false);
    } finally {
      setDeleting(false);
    }
  }


  function renderStatus() {
    switch (document.status) {
      case "uploading":
        return (
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400">
            <UploadCloud
              size={14}
              className="animate-pulse"
            />
            Uploading...
          </div>
        );

      case "processing":
        return (
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">
            <Clock3
              size={14}
              className="animate-spin"
            />
            Processing...
          </div>
        );

      case "failed":
        return (
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
            <XCircle size={14} />
            Failed
          </div>
        );

      default:
        return (
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <CheckCircle2 size={14} />
            AI Ready
          </div>
        );
    }
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/5 opacity-0 transition group-hover:opacity-100" />

      <div className="flex items-start justify-between p-5">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
          <FileText size={28} />
        </div>

        <div
          ref={menuRef}
          className="relative"
        >

          <button
            aria-label="Document menu"
            onClick={() =>
              setMenuOpen((prev) => !prev)
            }
            className="rounded-xl p-2 transition hover:bg-white/10"
          >
            <MoreVertical size={18} />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-2 z-20 w-44 overflow-hidden rounded-2xl border border-white/10 bg-[#101319] p-2 shadow-2xl backdrop-blur-xl"
            >
              <button
                onClick={() => {
                  setTitle(document.name);

                  setRenameOpen(true);

                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition hover:bg-white/5"
              >

                <Pencil size={16} />
                <span>Rename</span>
              </button>

              <button
                onClick={() => {
                  setConfirmDelete(true);

                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>

            </div>
          )}

        </div>

      </div>

      <div className="space-y-4 px-5 pb-5">

        <div>

          <h3 className="line-clamp-1 text-lg font-semibold text-white">
            {document.name}
          </h3>

          <p className="mt-1 text-sm text-white/50">
            {document.pages} Pages • {document.size}
          </p>

        </div>

        {renderStatus()}

        <div className="h-px bg-white/10" />

        <div className="flex items-center justify-between text-xs text-white/40">

          <span>Uploaded</span>

          <span>{document.uploadedAt}</span>

        </div>

        <div className="grid gap-3 pt-2">

          <Link
            to={`/dashboard/workspace/${document.id}`}
            className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:bg-cyan-400"
          >
            <span>
              Workspace
            </span>

            <ArrowRight size={18} />
          </Link>

          <Link
            to={`/dashboard/study-planner/${document.id}`}
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
          >
            <Sparkles size={18} />

            <span>
              Study Planner
            </span>
          </Link>

        </div>

      </div>

      {renameOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#101319] p-6 shadow-2xl">

            <h2 className="text-xl font-semibold text-white">
              Rename Document
            </h2>

            <p className="mt-2 text-sm text-white/50">
              Enter a new name.
            </p>

            <input
              autoFocus
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRename();
                }
              }}
              className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
            />

            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={() => {
                  setRenameOpen(false);

                  setTitle(document.name);
                }}
                className="rounded-2xl border border-white/10 px-5 py-3 text-white transition hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                onClick={handleRename}
                disabled={
                  renameMutation.isPending
                }
                className="rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:bg-cyan-400 disabled:opacity-60"
              >
                {renameMutation.isPending
                  ? "Saving..."
                  : "Save"}
              </button>

            </div>

          </div>

        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-[#101319] p-6 shadow-2xl">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
                <Trash2 size={22} />
              </div>

              <div>

                <h2 className="text-xl font-semibold text-white">
                  Delete Document
                </h2>

                <p className="text-sm text-white/50">
                  This action cannot be undone.
                </p>

              </div>

            </div>

            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">

              <p className="text-sm text-white/70">
                You are about to permanently delete
              </p>

              <p className="mt-2 font-semibold text-red-300">
                {document.name}
              </p>

            </div>

            <div className="mt-8 flex justify-end gap-3">

              <button
                onClick={() =>
                  setConfirmDelete(false)
                }
                disabled={deleting}
                className="rounded-2xl border border-white/10 px-5 py-3 text-white transition hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-2xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-400 disabled:opacity-60"
              >
                {deleting
                  ? "Deleting..."
                  : "Delete"}
              </button>

            </div>

          </div>

        </div>
      )}



    </motion.div>
  );
}