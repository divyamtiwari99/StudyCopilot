import DocumentCard, {
  type Document,
} from "./DocumentCard";

import EmptyState from "./EmptyState";

interface DocumentGridProps {
  documents: Document[];
}

export default function DocumentGrid({
  documents,
}: DocumentGridProps) {
  if (documents.length === 0) {
    return (
      <div
        className="
          rounded-[30px]
          border
          border-dashed
          p-4
          sm:p-6
        "
        style={{
          borderColor: "var(--border)",
          background:
            "color-mix(in srgb,var(--surfaceHover) 30%,transparent)",
        }}
      >
        <EmptyState />
      </div>
    );
  }

  return (
    <section
      className="
        grid
        grid-cols-1
        gap-5
        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
      "
      aria-label="Documents"
    >
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
        />
      ))}
    </section>
  );
}