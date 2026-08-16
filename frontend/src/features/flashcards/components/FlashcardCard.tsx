import {
  Brain,
  Trash2,
  ExternalLink,
  Calendar,
  Layers,
  X,
} from "lucide-react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import type {
  Flashcard,
} from "../types/flashcard.types";

import {
  useDeleteFlashcards,
} from "../hooks/useDeleteFlashcards";

interface FlashcardCardProps {
  flashcard: {
    _id: string;
    contentId: string;
    title: string;
    json: Flashcard[];
    createdAt: string;
    updatedAt: string;
  };
}

export default function FlashcardCard({
  flashcard,
}: FlashcardCardProps) {
  const navigate =
    useNavigate();

  const deleteMutation =
    useDeleteFlashcards();

  const [
    showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);

  function handleOpen() {
    navigate(
      `/dashboard/workspace/${flashcard.contentId}?tab=flashcards`,
    );
  }

  function handleDelete() {
    deleteMutation.mutate(
      flashcard.contentId,
      {
        onSuccess() {
          toast.success(
            "Flashcards removed from your library.",
          );

          setShowDeleteModal(false);
        },

        onError() {
          toast.error(
            "Failed to remove flashcards.",
          );
        },
      },
    );
  }

  return (
    <>
      <div
        className="
          rounded-3xl
          border
          p-5
          transition
        "
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--surface)",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.borderColor =
            "color-mix(in srgb,var(--accent-color) 30%,var(--border))";

          event.currentTarget.style.backgroundColor =
            "var(--surfaceHover)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.borderColor =
            "var(--border)";

          event.currentTarget.style.backgroundColor =
            "var(--surface)";
        }}
      >
        <div
          className="
            flex
            items-start
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
              backgroundColor:
                "color-mix(in srgb,var(--accent-color) 10%,transparent)",
            }}
          >
            <Brain
              size={22}
              style={{
                color:
                  "var(--accent-color)",
              }}
            />
          </div>

          <div className="flex-1">
            <h3
              className="
                line-clamp-1
                font-semibold
              "
              style={{
                color: "var(--text)",
              }}
            >
              {flashcard.title}
            </h3>

            <div
              className="
                mt-2
                flex
                flex-wrap
                items-center
                gap-4
                text-xs
              "
              style={{
                color: "var(--muted)",
              }}
            >
              <span
                className="
                  flex
                  items-center
                  gap-1
                "
              >
                <Calendar size={13} />

                {new Date(
                  flashcard.createdAt,
                ).toLocaleDateString()}
              </span>

              <span
                className="
                  flex
                  items-center
                  gap-1
                "
              >
                <Layers size={13} />

                {flashcard.json.length} Cards
              </span>
            </div>
          </div>
        </div>

        <div
          className="
            mt-5
            flex
            gap-3
          "
        >
          <button
            onClick={handleOpen}
            type="button"
            className="
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
              transition
            "
            style={{
              borderColor:
                "var(--border)",
              backgroundColor:
                "var(--surfaceHover)",
              color:
                "var(--text)",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.borderColor =
                "var(--accent-color)";

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
            <ExternalLink size={16} />

            Open
          </button>

          <button
            onClick={() =>
              setShowDeleteModal(true)
            }
            disabled={
              deleteMutation.isPending
            }
            type="button"
            className="
              flex
              items-center
              justify-center
              rounded-xl
              border
              px-4
              text-red-500
              transition
              disabled:opacity-50
            "
            style={{
              borderColor:
                "color-mix(in srgb,#ef4444 20%,transparent)",
              backgroundColor:
                "color-mix(in srgb,#ef4444 10%,transparent)",
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {showDeleteModal && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            px-4
            backdrop-blur-sm
          "
          style={{
            backgroundColor:
              "rgb(0 0 0 / 0.45)",
          }}
        >
          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              p-6
              shadow-2xl
            "
            style={{
              borderColor:
                "var(--border)",
              backgroundColor:
                "var(--surface)",
            }}
          >
            <div
              className="
                flex
                items-center
                justify-between
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
                Remove Flashcards?
              </h2>

              <button
                onClick={() =>
                  setShowDeleteModal(false)
                }
                type="button"
                className="transition"
                style={{
                  color:
                    "var(--muted)",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color =
                    "var(--text)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color =
                    "var(--muted)";
                }}
              >
                <X size={20} />
              </button>
            </div>

            <p
              className="
                mt-4
                text-sm
              "
              style={{
                color:
                  "var(--muted)",
              }}
            >
              This flashcard set will be permanently
              removed from your library.
            </p>

            <div
              className="
                mt-6
                flex
                justify-end
                gap-3
              "
            >
              <button
                onClick={() =>
                  setShowDeleteModal(false)
                }
                type="button"
                className="
                  rounded-xl
                  border
                  px-5
                  py-2.5
                  text-sm
                  transition
                "
                style={{
                  borderColor:
                    "var(--border)",
                  backgroundColor:
                    "var(--surfaceHover)",
                  color:
                    "var(--text)",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={
                  deleteMutation.isPending
                }
                type="button"
                className="
                  rounded-xl
                  bg-red-500
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  disabled:opacity-50
                "
              >
                {deleteMutation.isPending
                  ? "Removing..."
                  : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}