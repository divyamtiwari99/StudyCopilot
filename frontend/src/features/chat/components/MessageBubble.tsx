import { useMemo, useState } from "react";
import { Bot, ExternalLink, FileText, User, RotateCcw } from "lucide-react";
import { format } from "date-fns";

import MessageActions from "./MessageActions";
import MarkdownRenderer from "./MarkdownRenderer";
import type { ChatMessage } from "../types/chat.types";

interface Props {
  message: ChatMessage;
  onRetry?: (messageId: string) => void;
}

export default function MessageBubble({ message, onRetry }: Props) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const time = useMemo(
    () => format(new Date(message.createdAt), "hh:mm a"),
    [message.createdAt],
  );

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy message:", error);
    }
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex w-full max-w-5xl gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
          style={{
            background: isUser
              ? "var(--accent-color)"
              : "color-mix(in srgb,var(--accent-color) 9%,var(--surface))",
            borderColor: isUser
              ? "color-mix(in srgb,var(--accent-color) 35%,transparent)"
              : "color-mix(in srgb,var(--accent-color) 20%,var(--border))",
            color: isUser ? "#ffffff" : "var(--accent-color)",
          }}
        >
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>

        <div className="min-w-0 flex-1">
          <div className={`mb-2 flex items-center gap-2 ${isUser ? "justify-end" : ""}`}>
            <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
              {isUser ? "You" : "StudyCopilot"}
            </span>
            <span className="text-[11px]" style={{ color: "var(--muted)" }}>
              {time}
            </span>
          </div>

          <div
            className="overflow-hidden rounded-3xl border"
            style={{
              background: isUser
                ? "color-mix(in srgb,var(--accent-color) 9%,var(--surface))"
                : "var(--surface)",
              borderColor: isUser
                ? "color-mix(in srgb,var(--accent-color) 22%,var(--border))"
                : "var(--border)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            {message.attachments?.map((attachment, index) => (
              <div
                key={`${attachment.name}-${attachment.contentId ?? attachment.url ?? index}`}
                className="border-b p-3 sm:p-4"
                style={{ borderColor: "var(--border)" }}
              >
                {attachment.type === "image" && attachment.url ? (
                  <a href={attachment.url} target="_blank" rel="noreferrer" className="block w-fit">
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      className="max-h-80 max-w-full rounded-2xl object-contain"
                    />
                  </a>
                ) : attachment.type === "document" ? (
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex max-w-xl items-center gap-3 rounded-2xl border p-3 transition hover:-translate-y-0.5"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--surfaceHover)",
                      color: "var(--text)",
                    }}
                  >
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: "color-mix(in srgb,var(--accent-color) 10%,transparent)",
                        color: "var(--accent-color)",
                      }}
                    >
                      <FileText size={21} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{attachment.name}</p>
                      <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                        {attachment.status === "ready"
                          ? "AI Ready"
                          : attachment.status === "failed"
                            ? "Processing failed"
                            : "Processing · document context attached"}
                      </p>
                    </div>
                    {attachment.url ? <ExternalLink size={15} style={{ color: "var(--muted)" }} /> : null}
                  </a>
                ) : attachment.url ? (
                  <a href={attachment.url} target="_blank" rel="noreferrer" className="text-sm underline">
                    {attachment.name}
                  </a>
                ) : null}
              </div>
            ))}

            <div
              className="prose max-w-none break-words px-6 py-5 prose-p:my-3 prose-p:leading-7 prose-ul:my-3 prose-li:my-1 prose-headings:mb-3"
              style={{ color: "var(--text)" }}
            >
              <MarkdownRenderer content={message.content} />
            </div>

            {!isUser && message.sources?.length ? (
              <div className="border-t px-6 py-4" style={{ borderColor: "var(--border)" }}>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                  Sources
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {Array.from(
                    new Map(message.sources.map((source) => [source.contentId, source])).values(),
                  ).slice(0, 5).map((source) => (
                    <span
                      key={`${source.contentId}-${source.chunkId}`}
                      className="rounded-full border px-2.5 py-1 text-xs"
                      style={{ borderColor: "var(--border)", color: "var(--text)", background: "var(--surfaceHover)" }}
                    >
                      {source.title || "Document source"}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {message.status === "failed" && isUser ? (
            <div className="mt-2 flex items-center justify-end gap-2">
              <span className="text-xs" style={{ color: "var(--danger)" }}>
                {message.errorMessage || "AI generation failed."}
              </span>
              {onRetry ? (
                <button type="button" onClick={() => onRetry(message.id)} className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold" style={{ borderColor: "color-mix(in srgb,var(--danger) 25%,var(--border))", color: "var(--danger)", background: "var(--surface)" }}>
                  <RotateCcw size={13} /> Retry
                </button>
              ) : null}
            </div>
          ) : null}

          {!isUser && <MessageActions copied={copied} onCopy={copyMessage} />}
        </div>
      </div>
    </div>
  );
}
