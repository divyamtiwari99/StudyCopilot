import UploadZone from "@/features/dashboard/components/UploadZone";
import DocumentGrid from "@/components/documents/DocumentGrid";

import { useDocuments } from "@/features/documents/hooks/useDocuments";

import type { Document } from "@/components/documents/DocumentCard";

export default function DocumentsPage() {
  const {
    data,
    isLoading,
    isError,
  } = useDocuments();

  const documents: Document[] =
    (data ?? []).map((doc) => ({
      id: doc.id,
      name: doc.title,
      pages: 0,
      size: `${(doc.size / (1024 * 1024)).toFixed(2)} MB`,
      uploadedAt: new Date(
        doc.createdAt
      ).toLocaleDateString(),
      status: doc.status,
    }));

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-8 py-8">

      <section>

        <h1 className="text-4xl font-bold tracking-tight text-white">
          Documents
        </h1>

        <p className="mt-2 text-zinc-400">
          Upload your study material and prepare it
          for AI Chat, Notes, Flashcards and Quiz
          generation.
        </p>

      </section>

      <UploadZone />

      {isLoading && (
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">

          <h2 className="text-xl font-semibold text-white">
            Loading Documents...
          </h2>

          <p className="mt-2 text-zinc-400">
            Fetching your uploaded study material.
          </p>

        </div>
      )}

      {isError && (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-10 text-center">

          <h2 className="text-xl font-semibold text-red-300">
            Failed to load documents
          </h2>

          <p className="mt-2 text-red-400">
            Please refresh the page and try again.
          </p>

        </div>
      )}

      {!isLoading &&
        !isError &&
        documents.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-14 text-center">

            <h2 className="text-2xl font-bold text-white">
              No Documents Yet
            </h2>

            <p className="mt-3 text-zinc-400">
              Upload your first document to start
              chatting with AI.
            </p>

          </div>
        )}

      {!isLoading &&
        !isError &&
        documents.length > 0 && (
          <DocumentGrid
            documents={documents}
          />
        )}

    </main>
  );
}