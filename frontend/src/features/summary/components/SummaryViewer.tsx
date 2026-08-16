import ReactMarkdown from "react-markdown";

interface SummaryViewerProps {
  markdown: string;
}

export default function SummaryViewer({
  markdown,
}: SummaryViewerProps) {
  return (
    <div className="space-y-6">
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h1
            className="
              text-3xl
              font-bold
            "
            style={{
              color: "var(--text)",
            }}
          >
            AI Summary
          </h1>

          <p
            className="
              mt-2
            "
            style={{
              color: "var(--muted)",
            }}
          >
            AI-generated summary of your document.
          </p>
        </div>
      </div>

      <article
        className="
          prose
          max-w-none
          rounded-3xl
          border
          p-8
        "
        style={
          {
            borderColor:
              "var(--border)",
            backgroundColor:
              "var(--surface)",
            color:
              "var(--text)",

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
          } as React.CSSProperties
        }
      >
        <ReactMarkdown>
          {markdown}
        </ReactMarkdown>
      </article>
    </div>
  );
}