import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type {
  NotesArtifact,
} from "../services/notes.service";

interface NotesViewerProps {
  notes: NotesArtifact;
}

export default function NotesViewer({
  notes,
}: NotesViewerProps) {
  return (
    <div
      className="
        prose
        max-w-none
        rounded-2xl
        border
        p-8
        backdrop-blur-xl
        transition-all
        duration-300
      "
      style={{
        borderColor:
          "var(--border)",

        backgroundColor:
          "var(--surface)",

        color:
          "var(--text)",

        boxShadow:
          "var(--shadow-card)",

        "--tw-prose-body":
          "var(--text)",

        "--tw-prose-headings":
          "var(--text)",

        "--tw-prose-lead":
          "var(--muted)",

        "--tw-prose-links":
          "var(--accent-color)",

        "--tw-prose-bold":
          "var(--text)",

        "--tw-prose-counters":
          "var(--muted)",

        "--tw-prose-bullets":
          "var(--accent-color)",

        "--tw-prose-hr":
          "var(--border)",

        "--tw-prose-quotes":
          "var(--text)",

        "--tw-prose-quote-borders":
          "var(--border)",

        "--tw-prose-captions":
          "var(--muted)",

        "--tw-prose-code":
          "var(--text)",

        "--tw-prose-pre-code":
          "var(--text)",

        "--tw-prose-pre-bg":
          "var(--surfaceHover)",

        "--tw-prose-th-borders":
          "var(--border)",

        "--tw-prose-td-borders":
          "var(--border)",
      } as React.CSSProperties}
    >
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
        ]}
      >
        {notes.markdown}
      </ReactMarkdown>
    </div>
  );
}