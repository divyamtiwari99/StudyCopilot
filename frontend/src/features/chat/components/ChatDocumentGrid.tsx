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
      <div
        className="
          flex
          h-64
          items-center
          justify-center
        "
        style={{
          color: "var(--accent-color)",
        }}
      >
        <Loader2
          size={36}
          className="animate-spin"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
          rounded-3xl
          border
          p-8
          text-center
        "
        style={{
          borderColor:
            "color-mix(in srgb,var(--danger) 20%,var(--border))",

          background:
            "color-mix(in srgb,var(--danger) 8%,var(--surface))",
        }}
      >
        <h3
          className="
            text-xl
            font-semibold
          "
          style={{
            color: "var(--danger)",
          }}
        >
          Unable to load documents
        </h3>

        <p
          className="
            mt-2
            text-sm
          "
          style={{
            color: "var(--muted)",
          }}
        >
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  const documents: ChatDocument[] =
    (data ?? []).map((doc) => ({
      id: doc.id,

      title:
        doc.title ??
        doc.originalName,

      size:
        typeof doc.size === "number"
          ? `${(
              doc.size /
              1024 /
              1024
            ).toFixed(1)} MB`
          : doc.size,

      status:
        doc.status,
    }));

  const readyDocuments =
    documents.filter(
      (doc) =>
        doc.status === "ready",
    );

  if (!readyDocuments.length) {
    return (
      <div
        className="
          rounded-[32px]
          border
          border-dashed
          p-16
          text-center
        "
        style={{
          borderColor:
            "var(--border)",

          background:
            "var(--surfaceHover)",
        }}
      >
        <h2
          className="
            text-3xl
            font-bold
          "
          style={{
            color: "var(--text)",
          }}
        >
          No AI Ready Documents
        </h2>

        <p
          className="
            mt-4
          "
          style={{
            color: "var(--muted)",
          }}
        >
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
        <h2
          className="
            text-3xl
            font-bold
          "
          style={{
            color: "var(--text)",
          }}
        >
          Choose a Document
        </h2>

        <p
          className="mt-2"
          style={{
            color: "var(--muted)",
          }}
        >
          Start an AI conversation with
          any processed document.
        </p>
      </div>

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
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