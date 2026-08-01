import { useNavigate } from "react-router-dom";

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
  const navigate =
    useNavigate();

  if (documents.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

      {documents.map((document) => (

        <div
          key={document.id}
          className="cursor-pointer"
          onClick={() =>
            navigate(
              `/dashboard/workspace/${document.id}`
            )
          }
        >
          <DocumentCard
            document={document}
          />
        </div>

      ))}

    </section>
  );
}