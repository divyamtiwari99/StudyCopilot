import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  MoreVertical,
  Pencil,
  Sparkles,
  Trash2,
  UploadCloud,
  X,
  XCircle,
} from "lucide-react";
import { useRef, useState } from "react";

import { useDeleteDocument } from "@/features/dashboard/hooks/useDeleteDocument";
import { useRenameDocument } from "@/features/dashboard/hooks/useRenameDocument";
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

  const [renameOpen, setRenameOpen] =
    useState(false);

  const [confirmDelete, setConfirmDelete] =
    useState(false);

  const [title, setTitle] =
    useState(document.name);

  const [deleting, setDeleting] =
    useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  useClickOutside(
    menuRef,
    () => setMenuOpen(false),
  );

  const deleteMutation =
    useDeleteDocument();

  const renameMutation =
    useRenameDocument();

  async function handleRename() {
    const nextTitle =
      title.trim();

    if (!nextTitle) {
      toast.error(
        "Document title is required.",
      );
      return;
    }

    try {
      await renameMutation.mutateAsync({
        id: document.id,
        title: nextTitle,
      });

      setRenameOpen(false);
      setMenuOpen(false);
    } catch (error) {
      console.error(
        "Failed to rename document:",
        error,
      );

      toast.error(
        "Failed to rename document.",
      );
    }
  }

  async function handleDelete() {
    if (deleting) {
      return;
    }

    try {
      setDeleting(true);

      await deleteMutation.mutateAsync(
        document.id,
      );

      setConfirmDelete(false);
      setMenuOpen(false);
    } catch (error) {
      console.error(
        "Failed to delete document:",
        error,
      );

      toast.error(
        "Failed to delete document.",
      );
    } finally {
      setDeleting(false);
    }
  }

  function renderStatus() {
    switch (document.status) {
      case "uploading":
        return (
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-sky-500/20
              bg-sky-500/10
              px-3
              py-1
              text-xs
              font-medium
              text-sky-700
            "
          >
            <UploadCloud
              size={14}
              className="animate-pulse"
            />

            Uploading...
          </div>
        );

      case "processing":
        return (
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-yellow-500/20
              bg-yellow-500/10
              px-3
              py-1
              text-xs
              font-medium
              text-yellow-700
            "
          >
            <Clock3
              size={14}
              className="animate-spin"
            />

            Processing...
          </div>
        );

      case "failed":
        return (
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-red-500/20
              bg-red-500/10
              px-3
              py-1
              text-xs
              font-medium
              text-red-700
            "
          >
            <XCircle size={14} />

            Failed
          </div>
        );

      default:
        return (
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-emerald-500/20
              bg-emerald-500/10
              px-3
              py-1
              text-xs
              font-medium
              text-emerald-700
            "
          >
            <CheckCircle2 size={14} />

            AI Ready
          </div>
        );
    }
  }

  return (
    <>
      {/* =====================================================
          DOCUMENT CARD
          ===================================================== */}

      <motion.div
        whileHover={{
          y: -6,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          group
          relative
          overflow-visible
          rounded-[30px]
          border
          backdrop-blur-2xl
          transition-all
          duration-300
        "
        style={{
          background:
            "var(--surface)",
          borderColor:
            "var(--border)",
          boxShadow:
            "0 20px 45px rgba(15,23,42,0.06)",
        }}
      >
        {/* Hover glow */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
            rounded-[30px]
            opacity-0
            transition
            duration-500
            group-hover:opacity-100
          "
        >
          <div
            className="
              absolute
              -right-10
              -top-10
              h-28
              w-28
              rounded-full
              blur-3xl
            "
            style={{
              background:
                "color-mix(in srgb,var(--accent-color) 15%,transparent)",
            }}
          />
        </div>

        {/* ===================================================
            CARD HEADER
            =================================================== */}

        <div
          className="
            relative
            z-20
            flex
            items-start
            justify-between
            p-5
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
            "
            style={{
              background:
                "color-mix(in srgb,var(--accent-color) 12%,transparent)",
              color:
                "var(--accent-color)",
            }}
          >
            <FileText size={28} />
          </div>

          {/* =================================================
              MENU
              ================================================= */}

          <div
            ref={menuRef}
            className="
              relative
              z-[100]
            "
          >
            <button
              type="button"
              aria-label="Document menu"
              aria-expanded={menuOpen}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();

                setMenuOpen(
                  (previous) =>
                    !previous,
                );
              }}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                transition-all
                duration-200
                hover:bg-[var(--surfaceHover)]
              "
              style={{
                color:
                  "var(--muted)",
              }}
            >
              <MoreVertical size={18} />
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="
                  absolute
                  right-0
                  top-full
                  z-[200]
                  mt-2
                  w-44
                  overflow-hidden
                  rounded-2xl
                  border
                  p-2
                  shadow-2xl
                "
                style={{
                  /*
                   * Important:
                   * Fully opaque background so the
                   * document/filter behind cannot
                   * show through the menu.
                   */
                  backgroundColor:
                    "#ffffff",

                  borderColor:
                    "var(--border)",

                  boxShadow:
                    "0 18px 45px rgba(15,23,42,0.16)",
                }}
              >
                {/* Rename */}

                <button
                  type="button"
                  role="menuitem"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    setTitle(
                      document.name,
                    );

                    setRenameOpen(true);
                    setMenuOpen(false);
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    transition
                    hover:bg-gray-100
                  "
                  style={{
                    color:
                      "var(--text)",
                  }}
                >
                  <Pencil size={16} />

                  <span>
                    Rename
                  </span>
                </button>

                {/* Delete */}

                <button
                  type="button"
                  role="menuitem"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    setConfirmDelete(true);
                    setMenuOpen(false);
                  }}
                  className="
                    relative
                    z-[210]
                    flex
                    w-full
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    text-red-500
                    transition
                    hover:bg-red-50
                  "
                >
                  <Trash2
                    size={16}
                    className="shrink-0"
                  />

                  <span>
                    Delete
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ===================================================
            CARD CONTENT
            =================================================== */}

        <div
          className="
            relative
            z-10
            space-y-4
            px-5
            pb-5
          "
        >
          <div>
            <h3
              className="
                line-clamp-1
                text-lg
                font-semibold
              "
              style={{
                color:
                  "var(--text)",
              }}
            >
              {document.name}
            </h3>

            <p
              className="
                mt-1
                text-sm
              "
              style={{
                color:
                  "var(--muted)",
              }}
            >
              {document.pages} Pages •{" "}
              {document.size}
            </p>
          </div>

          {renderStatus()}

          <div
            className="h-px"
            style={{
              background:
                "var(--border)",
            }}
          />

          <div
            className="
              flex
              items-center
              justify-between
              text-xs
            "
            style={{
              color:
                "var(--muted)",
            }}
          >
            <span>
              Uploaded
            </span>

            <span>
              {document.uploadedAt}
            </span>
          </div>

          {/* Actions */}

          <div
            className="
              grid
              gap-3
              pt-2
            "
          >
            <Link
              to={`/dashboard/workspace/${document.id}`}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                px-5
                py-3
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:opacity-90
              "
              style={{
                background:
                  "var(--accent-color)",
              }}
            >
              Workspace

              <ArrowRight size={18} />
            </Link>

            <Link
              to={`/dashboard/study-planner/${document.id}`}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                border
                px-5
                py-3
                font-medium
                transition-all
                duration-300
              "
              style={{
                borderColor:
                  "var(--border)",

                color:
                  "var(--text)",

                background:
                  "var(--surfaceHover)",
              }}
            >
              <Sparkles size={18} />

              Study Planner
            </Link>
          </div>
        </div>
      </motion.div>

      {/* =====================================================
          RENAME MODAL
          ===================================================== */}

      {renameOpen && (
        <div
          className="
            fixed
            inset-0
            z-[1000]
            flex
            items-center
            justify-center
            bg-black/40
            px-4
            py-6
            backdrop-blur-md
          "
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setRenameOpen(false);
              setTitle(
                document.name,
              );
            }
          }}
        >
          <div
            className="
              w-full
              max-w-md
              rounded-[30px]
              border
              p-6
              shadow-2xl
              backdrop-blur-xl
            "
            style={{
              background:
                "var(--surface)",

              borderColor:
                "var(--border)",
            }}
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
          >
            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >
              <div>
                <h2
                  className="
                    text-xl
                    font-semibold
                  "
                  style={{
                    color:
                      "var(--text)",
                  }}
                >
                  Rename Document
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                  "
                  style={{
                    color:
                      "var(--muted)",
                  }}
                >
                  Enter a new name.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close rename dialog"
                onClick={() => {
                  setRenameOpen(false);
                  setTitle(
                    document.name,
                  );
                }}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  transition
                  hover:bg-[var(--surfaceHover)]
                "
                style={{
                  color:
                    "var(--muted)",
                }}
              >
                <X size={19} />
              </button>
            </div>

            <input
              type="text"
              autoFocus
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value,
                )
              }
              onKeyDown={(event) => {
                if (
                  event.key === "Enter"
                ) {
                  void handleRename();
                }

                if (
                  event.key === "Escape"
                ) {
                  setRenameOpen(false);
                  setTitle(
                    document.name,
                  );
                }
              }}
              className="
                mt-6
                w-full
                rounded-2xl
                border
                px-4
                py-3
                outline-none
                transition
              "
              style={{
                background:
                  "var(--surfaceHover)",

                borderColor:
                  "var(--border)",

                color:
                  "var(--text)",
              }}
            />

            <div
              className="
                mt-6
                flex
                justify-end
                gap-3
              "
            >
              <button
                type="button"
                onClick={() => {
                  setRenameOpen(false);
                  setTitle(
                    document.name,
                  );
                }}
                className="
                  rounded-2xl
                  border
                  px-5
                  py-3
                  transition
                "
                style={{
                  borderColor:
                    "var(--border)",

                  color:
                    "var(--text)",
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  void handleRename()
                }
                disabled={
                  renameMutation.isPending
                }
                className="
                  rounded-2xl
                  px-5
                  py-3
                  font-semibold
                  text-white
                  transition
                  disabled:opacity-60
                "
                style={{
                  background:
                    "var(--accent-color)",
                }}
              >
                {renameMutation.isPending
                  ? "Saving..."
                  : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          DELETE CONFIRMATION MODAL
          ===================================================== */}

      {confirmDelete && (
        <div
          className="
            fixed
            inset-0
            z-[1100]
            flex
            items-center
            justify-center
            bg-black/45
            px-4
            py-6
            backdrop-blur-md
          "
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              if (!deleting) {
                setConfirmDelete(
                  false,
                );
              }
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="
              w-full
              max-w-[560px]
              rounded-[30px]
              border
              p-7
              shadow-2xl
              sm:p-8
            "
            style={{
              background:
                "var(--surface)",

              borderColor:
                "var(--border)",

              boxShadow:
                "0 30px 80px rgba(15,23,42,0.24)",
            }}
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
          >
            <div
              className="
                flex
                items-start
                justify-between
                gap-5
              "
            >
              <div>
                <h2
                  className="
                    text-xl
                    font-semibold
                    tracking-tight
                  "
                  style={{
                    color:
                      "var(--text)",
                  }}
                >
                  Delete Document?
                </h2>

                <p
                  className="
                    mt-6
                    text-sm
                    leading-7
                  "
                  style={{
                    color:
                      "var(--muted)",
                  }}
                >
                  This action cannot be
                  undone. This document
                  will be permanently
                  removed.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close delete dialog"
                onClick={() => {
                  if (!deleting) {
                    setConfirmDelete(
                      false,
                    );
                  }
                }}
                disabled={deleting}
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  transition
                  hover:bg-[var(--surfaceHover)]
                  disabled:opacity-50
                "
                style={{
                  color:
                    "var(--muted)",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div
              className="
                mt-4
                truncate
                text-sm
                font-medium
              "
              style={{
                color:
                  "var(--text)",
              }}
              title={document.name}
            >
              {document.name}
            </div>

            <div
              className="
                mt-8
                flex
                flex-col-reverse
                gap-3
                sm:flex-row
                sm:justify-end
              "
            >
              <button
                type="button"
                onClick={() => {
                  if (!deleting) {
                    setConfirmDelete(
                      false,
                    );
                  }
                }}
                disabled={deleting}
                className="
                  rounded-full
                  border
                  px-7
                  py-3
                  text-sm
                  font-medium
                  transition
                  hover:-translate-y-0.5
                  disabled:opacity-50
                "
                style={{
                  background:
                    "var(--surfaceHover)",

                  borderColor:
                    "var(--border)",

                  color:
                    "var(--text)",
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  void handleDelete()
                }
                disabled={deleting}
                className="
                  rounded-full
                  bg-red-500
                  px-7
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-red-500/20
                  transition
                  hover:bg-red-600
                  disabled:opacity-60
                "
              >
                {deleting
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}