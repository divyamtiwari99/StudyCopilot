import { useState } from "react";

import UploadZone from "../components/documents/UploadZone";
import DocumentGrid from "../components/documents/DocumentGrid";
import type { Document } from "../components/documents/DocumentCard";

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
  const [documents] =
    useState<Document[]>(initialDocuments);

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Documents
        </h1>

        <p className="mt-2 text-white/50">
          Upload PDFs and prepare them for AI chat,
          notes, quizzes and flashcards.
        </p>
      </div>

      <UploadZone />

      <DocumentGrid documents={documents} />
    </div>
  );
}