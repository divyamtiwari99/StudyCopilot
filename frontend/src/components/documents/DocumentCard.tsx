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

  const [renameOpen, setRenameOpen] =
    useState(false);

  const [confirmDelete, setConfirmDelete] =
    useState(false);

  const [title, setTitle] =
    useState(document.name);

  const [deleting, setDeleting] =
    useState(false);

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
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              px-3
              py-1
              text-xs
              font-medium
            "
            style={{
              color: "var(--info)",
              background:
                "color-mix(in srgb,var(--info) 10%,transparent)",
              borderColor:
                "color-mix(in srgb,var(--info) 22%,var(--border))",
            }}
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
              px-3
              py-1
              text-xs
              font-medium
            "
            style={{
              color: "var(--warning)",
              background:
                "color-mix(in srgb,var(--warning) 10%,transparent)",
              borderColor:
                "color-mix(in srgb,var(--warning) 22%,var(--border))",
            }}
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
              px-3
              py-1
              text-xs
              font-medium
            "
            style={{
              color: "var(--danger)",
              background:
                "color-mix(in srgb,var(--danger) 10%,transparent)",
              borderColor:
                "color-mix(in srgb,var(--danger) 22%,var(--border))",
            }}
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
              px-3
              py-1
              text-xs
              font-medium
            "
            style={{
              color: "var(--success)",
              background:
                "color-mix(in srgb,var(--success) 10%,transparent)",
              borderColor:
                "color-mix(in srgb,var(--success) 22%,var(--border))",
            }}
          >
            <CheckCircle2 size={14} />

            AI Ready
          </div>
        );
    }
  }

  return (
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
        overflow-hidden
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
          "var(--shadow-card)",
      }}
    >
      {/* Hover Glow */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
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

        <div
          className="
            absolute
            -bottom-16
            -left-16
            h-28
            w-28
            rounded-full
            blur-3xl
          "
          style={{
            background:
              "color-mix(in srgb,var(--accent-color) 8%,transparent)",
          }}
        />
      </div>

      {/* Header */}

      <div
        className="
          relative
          z-10
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
            border
          "
          style={{
            background:
              "color-mix(in srgb,var(--accent-color) 12%,transparent)",

            borderColor:
              "color-mix(in srgb,var(--accent-color) 18%,var(--border))",

            color:
              "var(--accent-color)",
          }}
        >
          <FileText size={28} />
        </div>

        {/* Menu */}

        <div
          ref={menuRef}
          className="relative"
        >
          <button
            type="button"
            aria-label="Document menu"
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen(
                (prev) => !prev,
              )
            }
            className="
              rounded-xl
              p-2
              transition-all
              duration-300
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
                z-20
                mt-2
                w-44
                overflow-hidden
                rounded-2xl
                border
                p-2
                shadow-2xl
                backdrop-blur-xl
              "
              style={{
                background:
                  "var(--surface)",

                borderColor:
                  "var(--border)",

                boxShadow:
                  "var(--shadow-hover)",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setTitle(document.name);
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
                  py-2
                  text-sm
                  transition
                  hover:bg-[var(--surfaceHover)]
                "
                style={{
                  color:
                    "var(--text)",
                }}
              >
                <Pencil size={16} />

                Rename
              </button>

              <button
                type="button"
                onClick={() => {
                  setConfirmDelete(true);
                  setMenuOpen(false);
                }}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2
                  text-sm
                  transition
                "
                style={{
                  color:
                    "var(--danger)",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background =
                    "color-mix(in srgb,var(--danger) 10%,transparent)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background =
                    "transparent";
                }}
              >
                <Trash2 size={16} />

                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}

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
            {document.pages} Pages
            {" • "}
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

        {/* Uploaded */}

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

              boxShadow:
                "0 10px 25px color-mix(in srgb,var(--accent-color) 18%,transparent)",
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
              hover:-translate-y-0.5
            "
            style={{
              borderColor:
                "var(--border)",

              color:
                "var(--text)",

              background:
                "var(--surfaceHover)",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.borderColor =
                "color-mix(in srgb,var(--accent-color) 35%,var(--border))";

              event.currentTarget.style.color =
                "var(--accent-color)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.borderColor =
                "var(--border)";

              event.currentTarget.style.color =
                "var(--text)";
            }}
          >
            <Sparkles size={18} />

            Study Planner
          </Link>
        </div>
      </div>

      {/* Rename Modal */}

      {renameOpen && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/20
            p-4
            backdrop-blur-sm
          "
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

              boxShadow:
                "var(--shadow-hover)",
            }}
          >
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

            <input
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
                  setTitle(document.name);
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
              onFocus={(event) => {
                event.currentTarget.style.borderColor =
                  "var(--accent-color)";
              }}
              onBlur={(event) => {
                event.currentTarget.style.borderColor =
                  "var(--border)";
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
                  setTitle(document.name);
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

                  background:
                    "var(--surfaceHover)",
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  void handleRename();
                }}
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
                  disabled:cursor-not-allowed
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

      {/* Delete Confirmation */}

      {confirmDelete && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/20
            p-4
            backdrop-blur-sm
          "
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
                "color-mix(in srgb,var(--danger) 25%,var(--border))",

              boxShadow:
                "var(--shadow-hover)",
            }}
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                "
                style={{
                  background:
                    "color-mix(in srgb,var(--danger) 10%,transparent)",

                  color:
                    "var(--danger)",
                }}
              >
                <Trash2 size={22} />
              </div>

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
                  Delete Document
                </h2>

                <p
                  className="
                    text-sm
                  "
                  style={{
                    color:
                      "var(--muted)",
                  }}
                >
                  This action cannot be
                  undone.
                </p>
              </div>
            </div>

            <div
              className="
                mt-6
                rounded-2xl
                border
                p-4
              "
              style={{
                background:
                  "color-mix(in srgb,var(--danger) 7%,var(--surface))",

                borderColor:
                  "color-mix(in srgb,var(--danger) 20%,var(--border))",
              }}
            >
              <p
                className="
                  text-sm
                "
                style={{
                  color:
                    "var(--muted)",
                }}
              >
                You are about to
                permanently delete
              </p>

              <p
                className="
                  mt-2
                  font-semibold
                "
                style={{
                  color:
                    "var(--danger)",
                }}
              >
                {document.name}
              </p>
            </div>

            <div
              className="
                mt-8
                flex
                justify-end
                gap-3
              "
            >
              <button
                type="button"
                onClick={() =>
                  setConfirmDelete(false)
                }
                disabled={deleting}
                className="
                  rounded-2xl
                  border
                  px-5
                  py-3
                  transition
                  disabled:opacity-60
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
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  void handleDelete();
                }}
                disabled={deleting}
                className="
                  rounded-2xl
                  px-5
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:brightness-105
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
                style={{
                  background:
                    "var(--danger)",

                  boxShadow:
                    "0 8px 20px color-mix(in srgb,var(--danger) 18%,transparent)",
                }}
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