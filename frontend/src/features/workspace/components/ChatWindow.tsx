import { Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { useChat } from "@/features/chat/hooks/useChat";
import ChatEmptyState from "@/features/chat/components/ChatEmptyState";
import ChatInput from "@/features/chat/components/ChatInput";
import MessageBubble from "@/features/chat/components/MessageBubble";
import TypingIndicator from "@/features/chat/components/TypingIndicator";

export default function ChatWindow() {
  const { contentId } = useParams<{ contentId: string }>();

  const {
    messages,
    loading,
    sendMessage,
    clearMessages,
  } = useChat(contentId ?? "");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);

  if (!contentId) {
    return (
      <div
        className="flex min-h-[560px] items-center justify-center rounded-3xl border p-8 text-center"
        style={{
          borderColor: "var(--border)",
          background: "var(--surface)",
          color: "var(--muted)",
        }}
      >
        Unable to open chat because the document could not be identified.
      </div>
    );
  }

  return (
    <div
      className="flex h-[700px] min-h-0 flex-col overflow-hidden rounded-[28px] border backdrop-blur-2xl"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <header
        className="flex shrink-0 items-center justify-between gap-4 border-b px-6 py-5 sm:px-8"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in srgb,var(--surface) 96%,transparent)",
        }}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border"
            style={{
              background: "color-mix(in srgb,var(--accent-color) 10%,transparent)",
              borderColor: "color-mix(in srgb,var(--accent-color) 20%,var(--border))",
            }}
          >
            <Sparkles size={20} style={{ color: "var(--accent-color)" }} />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
              AI Study Chat
            </h2>
            <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
              Ask questions from this document.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={clearMessages}
          disabled={!messages.length || loading}
          className="rounded-xl border px-3 py-2 text-sm font-medium transition hover:bg-[var(--surfaceHover)] disabled:cursor-not-allowed disabled:opacity-40"
          style={{
            borderColor: "var(--border)",
            color: "var(--text)",
            background: "var(--surfaceHover)",
          }}
        >
          New Chat
        </button>
      </header>

      <div
        className="min-h-0 flex-1 overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        {messages.length === 0 ? (
          <ChatEmptyState onQuestion={(question) => void sendMessage(question)} />
        ) : (
          <div className="mx-auto flex max-w-5xl flex-col gap-7 p-5 sm:p-8">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="shrink-0 p-4 sm:p-5">
        <ChatInput loading={loading} onSend={sendMessage} />
      </div>
    </div>
  );
}
