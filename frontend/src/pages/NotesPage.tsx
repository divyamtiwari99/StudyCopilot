import { useParams } from "react-router-dom";

import {
  FileText,
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
      <div className="flex h-96 items-center justify-center text-zinc-400">
        Loading notes...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-96 flex-col items-center justify-center">

        <FileText
          className="mb-4 text-red-400"
          size={44}
        />

        <h2 className="text-xl font-semibold text-white">
          Failed to load notes
        </h2>

      </div>
    );
  }

  if (!notes) {
    return (
      <div className="flex h-96 flex-col items-center justify-center">

        <FileText
          className="mb-4 text-zinc-500"
          size={44}
        />

        <h2 className="text-xl font-semibold text-white">
          No Notes Yet
        </h2>

        <p className="mt-2 text-zinc-400">
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