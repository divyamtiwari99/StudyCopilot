import ReactMarkdown from "react-markdown";

interface SummaryViewerProps {
  markdown: string;
}

export default function SummaryViewer({
  markdown,
}: SummaryViewerProps) {
  return (
    <div className="mx-auto max-w-5xl">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-white">
            AI Summary
          </h1>

          <p className="mt-2 text-zinc-400">
            AI-generated summary of your document.
          </p>

        </div>

      </div>

      <article className="prose prose-invert prose-cyan max-w-none rounded-3xl border border-white/10 bg-white/[0.04] p-8">

        <ReactMarkdown>
          {markdown}
        </ReactMarkdown>

      </article>

    </div>
  );
}