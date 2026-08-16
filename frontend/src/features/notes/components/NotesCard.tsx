import {
  FileText,
  Trash2,
  ExternalLink,
  Calendar,
  X,
} from "lucide-react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import type {
  NotesArtifact,
} from "../services/notes.service";

import {
  useDeleteNotes,
} from "../hooks/useDeleteNotes";

interface NotesCardProps {
  note: NotesArtifact;
}

export default function NotesCard({
  note,
}: NotesCardProps) {
  const navigate =
    useNavigate();

  const deleteMutation =
    useDeleteNotes();

  const [
    showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);

  function handleOpen() {
    navigate(
      `/dashboard/workspace/${note.contentId}?tab=notes`,
    );
  }

  function handleDelete() {
    deleteMutation.mutate(
      note.contentId,
      {
        onSuccess() {
          toast.success(
            "Notes deleted successfully.",
          );

          setShowDeleteModal(false);
        },

        onError() {
          toast.error(
            "Failed to delete notes.",
          );
        },
      },
    );
  }

  return (
    <>
      {/* Notes Card */}

      <div
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          p-5
          backdrop-blur-xl
          transition-all
          duration-300
          hover:-translate-y-1
        "
        style={{
          background:
            "var(--surface)",

          borderColor:
            "var(--border)",

          boxShadow:
            "var(--shadow-card)",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.borderColor =
            "color-mix(in srgb,var(--accent-color) 30%,var(--border))";

          event.currentTarget.style.boxShadow =
            "var(--shadow-hover)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.borderColor =
            "var(--border)";

          event.currentTarget.style.boxShadow =
            "var(--shadow-card)";
        }}
      >
        {/* Accent Glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-14
            -top-14
            h-32
            w-32
            rounded-full
            blur-3xl
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-20
          "
          style={{
            background:
              "var(--accent-color)",
          }}
        />

        <div className="relative z-10">
          {/* Header */}

          <div
            className="
              flex
              items-start
              justify-between
              gap-4
            "
          >
            <div
              className="
                flex
                min-w-0
                items-center
                gap-3
              "
            >
              {/* Icon */}

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  transition-all
                  duration-300
                  group-hover:scale-105
                "
                style={{
                  background:
                    "color-mix(in srgb,var(--accent-color) 10%,transparent)",

                  borderColor:
                    "color-mix(in srgb,var(--accent-color) 20%,var(--border))",

                  color:
                    "var(--accent-color)",
                }}
              >
                <FileText
                  size={22}
                  strokeWidth={1.8}
                />
              </div>

              {/* Title + Date */}

              <div className="min-w-0">
                <h3
                  className="
                    line-clamp-1
                    font-semibold
                  "
                  style={{
                    color:
                      "var(--text)",
                  }}
                  title={note.title}
                >
                  {note.title}
                </h3>

                <div
                  className="
                    mt-1
                    flex
                    items-center
                    gap-2
                    text-xs
                  "
                  style={{
                    color:
                      "var(--muted)",
                  }}
                >
                  <Calendar
                    size={13}
                  />

                  {new Date(
                    note.createdAt,
                  ).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}

          <div
            className="
              mt-5
              flex
              gap-3
            "
          >
            {/* Open */}

            <button
              type="button"
              onClick={handleOpen}
              className="
                group/open
                flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                px-4
                py-2.5
                text-sm
                font-medium
                transition-all
                duration-200
                hover:-translate-y-0.5
              "
              style={{
                background:
                  "var(--surfaceHover)",

                borderColor:
                  "var(--border)",

                color:
                  "var(--text)",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.borderColor =
                  "color-mix(in srgb,var(--accent-color) 30%,var(--border))";

                event.currentTarget.style.background =
                  "color-mix(in srgb,var(--accent-color) 8%,var(--surfaceHover))";

                event.currentTarget.style.color =
                  "var(--accent-color)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.borderColor =
                  "var(--border)";

                event.currentTarget.style.background =
                  "var(--surfaceHover)";

                event.currentTarget.style.color =
                  "var(--text)";
              }}
            >
              <ExternalLink
                size={16}
                className="
                  transition-transform
                  duration-200
                  group-hover/open:-translate-y-0.5
                "
              />

              Open
            </button>

            {/* Delete */}

            <button
              type="button"
              onClick={() =>
                setShowDeleteModal(true)
              }
              disabled={
                deleteMutation.isPending
              }
              aria-label="Delete notes"
              className="
                flex
                items-center
                justify-center
                rounded-xl
                border
                px-4
                transition-all
                duration-200
                hover:-translate-y-0.5
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
              style={{
                color:
                  "var(--danger)",

                background:
                  "color-mix(in srgb,var(--danger) 8%,transparent)",

                borderColor:
                  "color-mix(in srgb,var(--danger) 22%,var(--border))",
              }}
              onMouseEnter={(event) => {
                if (
                  !deleteMutation.isPending
                ) {
                  event.currentTarget.style.background =
                    "color-mix(in srgb,var(--danger) 15%,transparent)";

                  event.currentTarget.style.borderColor =
                    "color-mix(in srgb,var(--danger) 35%,var(--border))";
                }
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background =
                  "color-mix(in srgb,var(--danger) 8%,transparent)";

                event.currentTarget.style.borderColor =
                  "color-mix(in srgb,var(--danger) 22%,var(--border))";
              }}
            >
              <Trash2
                size={16}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}

      {showDeleteModal && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/60
            px-4
            backdrop-blur-sm
          "
        >
          <div
            className="
              w-full
              max-w-md
              overflow-hidden
              rounded-3xl
              border
              p-6
              shadow-2xl
              backdrop-blur-2xl
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
            {/* Modal Header */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-4
              "
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
                Delete Notes?
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowDeleteModal(
                    false,
                  )
                }
                aria-label="Close delete dialog"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  transition-all
                  duration-200
                  hover:rotate-90
                "
                style={{
                  color:
                    "var(--muted)",

                  background:
                    "transparent",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background =
                    "var(--surfaceHover)";

                  event.currentTarget.style.color =
                    "var(--text)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background =
                    "transparent";

                  event.currentTarget.style.color =
                    "var(--muted)";
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Description */}

            <p
              className="
                mt-4
                text-sm
                leading-6
              "
              style={{
                color:
                  "var(--muted)",
              }}
            >
              This action cannot be
              undone. These notes will
              be permanently removed.
            </p>

            {/* Modal Actions */}

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
                onClick={() =>
                  setShowDeleteModal(
                    false,
                  )
                }
                className="
                  rounded-xl
                  border
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
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
                onClick={
                  handleDelete
                }
                disabled={
                  deleteMutation.isPending
                }
                className="
                  rounded-xl
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
                style={{
                  background:
                    "var(--danger)",

                  boxShadow:
                    "0 8px 20px color-mix(in srgb,var(--danger) 18%,transparent)",
                }}
              >
                {deleteMutation.isPending
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