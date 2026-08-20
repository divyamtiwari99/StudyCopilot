import { useMemo } from "react";
import { Sparkles } from "lucide-react";

import { useDocuments } from "@/features/documents/hooks/useDocuments";

import { useChat } from "../hooks/useChat";
import ChatHistory from "./ChatHistory";
import TutorContextPanel from "./TutorContextPanel";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function AITutorWorkspace() {
  const chat = useChat();
  const { data: documents = [], isLoading: documentsLoading } = useDocuments();

  const selectedIds = chat.session?.documentIds ?? [];

  const selectedNames = useMemo(
    () =>
      documents
        .filter((document) => selectedIds.includes(document.id))
        .map((document) => document.title || document.originalName),
    [documents, selectedIds],
  );



  return (
    <div className="space-y-6">
      <section
        className="relative overflow-hidden rounded-[32px] border p-6 sm:p-8"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-[110px] opacity-20"
          style={{ background: "var(--accent-color)" }}
        />
        <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold"
              style={{
                color: "var(--accent-color)",
                background: "color-mix(in srgb,var(--accent-color) 9%,transparent)",
                borderColor: "color-mix(in srgb,var(--accent-color) 22%,var(--border))",
              }}
            >
              <Sparkles size={14} />
              AI Tutor
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text)" }}>
              Ask anything. Learn from anywhere.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 sm:text-base" style={{ color: "var(--muted)" }}>
              Chat freely, optionally bring your PDFs into context, and attach an image when you want StudyCopilot to analyze it.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border px-4 py-3" style={{ background: "var(--surfaceHover)", borderColor: "var(--border)" }}>
            <p className="text-xs font-medium" style={{ color: "var(--muted)" }}>Current context</p>
            <p className="mt-1 text-sm font-semibold" style={{ color: "var(--text)" }}>
              {selectedIds.length ? `${selectedIds.length} PDF${selectedIds.length > 1 ? "s" : ""} selected` : "General AI"}
            </p>
          </div>
        </div>
      </section>

      <div className="grid min-w-0 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <ChatHistory
          sessions={chat.sessions}
          activeId={chat.session?._id}
          loading={chat.loading || chat.initializing}
          onNew={chat.createNewChat}
          onSelect={chat.selectSession}
          onRename={chat.rename}
          onDelete={chat.removeSession}
        />

        <main className="min-w-0 space-y-4">
          <TutorContextPanel
            documents={documents}
            selectedIds={selectedIds}
            loading={documentsLoading || chat.sessionLoading}
            onChange={chat.setDocumentContext}
          />

          {selectedNames.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 px-1 text-xs" style={{ color: "var(--muted)" }}>
              <span className="font-semibold">Using:</span>
              {selectedNames.map((name) => (
                <span key={name} className="rounded-full border px-2.5 py-1" style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}>
                  {name}
                </span>
              ))}
            </div>
          )}

          <section
            className="overflow-hidden rounded-[28px] border"
            style={{
              background: "var(--surfaceHover)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <header className="flex items-center justify-between gap-4 border-b px-5 py-4 sm:px-6" style={{ borderColor: "var(--border)" }}>
              <div className="min-w-0">
                <p className="truncate font-semibold" style={{ color: "var(--text)" }}>
                  {chat.session?.title || "New Chat"}
                </p>
                <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                  {chat.session?.documentIds.length ? "Document-aware conversation" : "General learning conversation"}
                </p>
              </div>
            </header>

            <div className="min-h-[420px] sm:min-h-[520px]">
              {chat.initializing || chat.sessionLoading ? (
                <div className="flex min-h-[420px] items-center justify-center text-sm" style={{ color: "var(--muted)" }}>
                  Restoring your conversation…
                </div>
              ) : (
                <ChatMessages
                  messages={chat.messages}
                  loading={chat.loading}
                  onQuestion={(question) => void chat.sendMessage(question)}
                  onRetry={(messageId) => void chat.retryMessage(messageId)}
                />
              )}
            </div>

            <div className="p-3 sm:p-4">
              <ChatInput
                loading={chat.loading || chat.initializing || chat.sessionLoading}
                onSend={chat.sendMessage}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
