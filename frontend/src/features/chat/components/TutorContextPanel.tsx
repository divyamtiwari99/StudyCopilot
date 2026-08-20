import { Check, FileText, Loader2, X } from "lucide-react";

import type { UploadedDocument } from "@/features/dashboard/services/document.service";

interface Props {
  documents: UploadedDocument[];
  selectedIds: string[];
  loading?: boolean;
  onChange: (ids: string[]) => Promise<void>;
  onUpload?: (file: File) => Promise<void>;
}

export default function TutorContextPanel({
  documents,
  selectedIds,
  loading = false,
  onChange,
}: Props) {
  const availableDocuments = documents;

  function toggle(id: string, ready: boolean) {
    if (!ready || loading) return;

    const next = selectedIds.includes(id)
      ? selectedIds.filter((value) => value !== id)
      : [...selectedIds, id];

    void onChange(next);
  }

  return (
    <section
      className="rounded-[28px] border p-4 sm:p-5"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <FileText size={18} style={{ color: "var(--accent-color)" }} />
            <h2 className="font-semibold" style={{ color: "var(--text)" }}>
              Use uploaded documents
            </h2>
          </div>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            Optional context. Leave empty for general AI.
          </p>
        </div>

        {selectedIds.length > 0 && (
          <button
            type="button"
            onClick={() => void onChange([])}
            disabled={loading}
            className="inline-flex shrink-0 items-center gap-1 rounded-xl px-2.5 py-2 text-xs font-medium hover:bg-[var(--surfaceHover)] disabled:opacity-50"
            style={{ color: "var(--muted)" }}
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex min-h-20 items-center justify-center">
          <Loader2 size={20} className="animate-spin" style={{ color: "var(--accent-color)" }} />
        </div>
      ) : availableDocuments.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
          No documents yet. Upload one from the attachment button.
        </div>
      ) : (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {availableDocuments.map((document) => {
            const selected = selectedIds.includes(document.id);
            const ready = document.status === "ready";
            const processing = document.status === "processing" || document.status === "uploading";

            return (
              <button
                key={document.id}
                type="button"
                disabled={!ready || loading}
                onClick={() => toggle(document.id, ready)}
                className="flex min-w-[210px] items-center gap-3 rounded-2xl border px-3 py-3 text-left transition hover:-translate-y-0.5 disabled:cursor-default disabled:opacity-80"
                style={{
                  borderColor: selected
                    ? "color-mix(in srgb,var(--accent-color) 40%,var(--border))"
                    : "var(--border)",
                  background: selected
                    ? "color-mix(in srgb,var(--accent-color) 8%,var(--surface))"
                    : "var(--surfaceHover)",
                  color: "var(--text)",
                }}
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: "color-mix(in srgb,var(--accent-color) 10%,transparent)",
                    color: "var(--accent-color)",
                  }}
                >
                  {processing ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : document.status === "failed" ? (
                    <X size={17} />
                  ) : selected ? (
                    <Check size={17} />
                  ) : (
                    <FileText size={17} />
                  )}
                </div>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {document.title || document.originalName}
                  </span>
                  <span className="mt-0.5 block text-[11px]" style={{ color: "var(--muted)" }}>
                    {processing
                      ? "Processing…"
                      : document.status === "failed"
                        ? "Processing failed"
                        : "AI Ready"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
