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
    return <EmptyState />;
  }


  return (

    <section
      className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >

      {documents.map((document)=>(

        <DocumentCard
          key={document.id}
          document={document}
        />

      ))}

    </section>

  );

}