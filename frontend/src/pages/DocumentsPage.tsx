import { useState } from "react";

import UploadZone from "@/features/dashboard/components/UploadZone";
import DocumentGrid from "@/components/documents/DocumentGrid";
import type { Document } from "@/components/documents/DocumentCard";

const initialDocuments: Document[] = [
  {
    id: "1",
    name: "Operating System Notes.pdf",
    pages: 146,
    size: "8.4 MB",
    uploadedAt: "Today",
    status: "ready",
  },
  {
    id: "2",
    name: "DBMS Complete Guide.pdf",
    pages: 212,
    size: "12.6 MB",
    uploadedAt: "Yesterday",
    status: "ready",
  },
  {
    id: "3",
    name: "Computer Networks.pdf",
    pages: 94,
    size: "5.1 MB",
    uploadedAt: "2 days ago",
    status: "processing",
  },
];

export default function DocumentsPage() {
  const [documents] = useState<Document[]>(initialDocuments);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-8 py-8">
      <section>
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Documents
        </h1>

        <p className="mt-2 text-zinc-400">
          Upload your study material and prepare it for AI Chat,
          Notes, Flashcards and Quiz generation.
        </p>
      </section>

      <UploadZone />

      <DocumentGrid documents={documents} />
    </main>
  );
}