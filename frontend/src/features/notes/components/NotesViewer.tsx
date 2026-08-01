import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { NotesArtifact } from "../services/notes.service";

interface NotesViewerProps {
  notes: NotesArtifact;
}

export default function NotesViewer({
  notes,
}: NotesViewerProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">

      <div className="border-b border-white/10 p-6">

        <h2 className="text-2xl font-bold text-white">
          {notes.title}
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Generated{" "}
          {new Date(
            notes.updatedAt,
          ).toLocaleString()}
        </p>

      </div>

      <div className="prose prose-invert prose-cyan max-w-none p-8">

        <ReactMarkdown
          remarkPlugins={[
            remarkGfm,
          ]}
        >
          {notes.markdown}
        </ReactMarkdown>

      </div>

    </div>
  );
}