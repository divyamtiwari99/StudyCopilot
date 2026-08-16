import { useParams } from "react-router-dom";

import {
  FileText,
  Loader2,
} from "lucide-react";

import {
  useNotes,
} from "@/features/notes/hooks/useNotes";

import NotesViewer from "@/features/notes/components/NotesViewer";

export default function NotesPage() {
  const { contentId } =
    useParams();

  const {
    data: notes,
    isLoading,
    isError,
  } = useNotes(contentId);

  if (isLoading) {
    return (
      <div
        className="
          flex
          h-96
          flex-col
          items-center
          justify-center
          gap-4
          rounded-3xl
          border
        "
        style={{
          borderColor:
            "var(--border)",

          background:
            "var(--surface)",

          boxShadow:
            "var(--shadow-card)",
        }}
      >
        <Loader2
          size={40}
          className="animate-spin"
          style={{
            color:
              "var(--accent-color)",
          }}
        />

        <p
          className="
            text-sm
            font-medium
          "
          style={{
            color:
              "var(--muted)",
          }}
        >
          Loading notes...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
          flex
          h-96
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          p-8
          text-center
        "
        style={{
          borderColor:
            "color-mix(in srgb,var(--danger) 20%,var(--border))",

          background:
            "color-mix(in srgb,var(--danger) 4%,var(--surface))",

          boxShadow:
            "var(--shadow-card)",
        }}
      >
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            border
          "
          style={{
            background:
              "color-mix(in srgb,var(--danger) 10%,transparent)",

            borderColor:
              "color-mix(in srgb,var(--danger) 20%,var(--border))",

            color:
              "var(--danger)",
          }}
        >
          <FileText
            size={32}
          />
        </div>

        <h2
          className="
            mt-5
            text-xl
            font-semibold
          "
          style={{
            color:
              "var(--text)",
          }}
        >
          Failed to load notes
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
          Please try again.
        </p>
      </div>
    );
  }

  if (!notes) {
    return (
      <div
        className="
          flex
          h-96
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          border-dashed
          p-8
          text-center
        "
        style={{
          borderColor:
            "var(--border)",

          background:
            "var(--surface)",

          boxShadow:
            "var(--shadow-card)",
        }}
      >
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            border
          "
          style={{
            background:
              "color-mix(in srgb,var(--accent-color) 9%,transparent)",

            borderColor:
              "color-mix(in srgb,var(--accent-color) 18%,var(--border))",

            color:
              "var(--accent-color)",
          }}
        >
          <FileText
            size={32}
          />
        </div>

        <h2
          className="
            mt-5
            text-xl
            font-semibold
          "
          style={{
            color:
              "var(--text)",
          }}
        >
          No Notes Yet
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
          Generate Notes from the AI
          Command Center.
        </p>
      </div>
    );
  }

  return (
    <NotesViewer
      notes={notes}
    />
  );
}