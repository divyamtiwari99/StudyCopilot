import { Loader2 } from "lucide-react";

import ChatDocumentCard, {
  type ChatDocument,
} from "./ChatDocumentCard";

import { useDocuments } from "@/features/documents/hooks/useDocuments";

export default function ChatDocumentGrid() {
  const {
    data,
    isLoading,
    isError,
  } = useDocuments();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2
          size={36}
          className="animate-spin text-indigo-400"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
        <h3 className="text-xl font-semibold text-red-300">
          Unable to load documents
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  const documents: ChatDocument[] =
    (data ?? []).map((doc: any) => ({
      id: doc.id,

      title:
        doc.title ??
        doc.originalName,

      pages:
        doc.pages ?? 0,

      size:
        typeof doc.size === "number"
          ? `${(
              doc.size /
              1024 /
              1024
            ).toFixed(1)} MB`
          : doc.size,

      // Backend returns "completed"
      status: doc.status,
    }));

  const readyDocuments =
    documents.filter(
      (doc) =>
        doc.status === "completed",
    );

  if (!readyDocuments.length) {
    return (
      <div className="rounded-[32px] border border-dashed border-white/10 bg-white/[0.03] p-16 text-center">
        <h2 className="text-3xl font-bold text-white">
          No AI Ready Documents
        </h2>

        <p className="mt-4 text-slate-400">
          Upload and process a document
          before starting an AI
          conversation.
        </p>
      </div>
    );
  }

  return (
    <section className="mt-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">
          Choose a Document
        </h2>

        <p className="mt-2 text-slate-400">
          Start an AI conversation with
          any processed document.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {readyDocuments.map(
          (document) => (
            <ChatDocumentCard
              key={document.id}
              document={document}
            />
          ),
        )}
      </div>
    </section>
  );
}