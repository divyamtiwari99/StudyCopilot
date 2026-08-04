import { useMemo, useState } from "react";

import {
  Bot,
  User,
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { format } from "date-fns";

import MessageActions from "./MessageActions";

import type {
  ChatMessage,
} from "../types/chat.types";

interface Props {
  message: ChatMessage;
}

export default function MessageBubble({
  message,
}: Props) {
  const isUser =
    message.role === "user";

  const [
    copied,
    setCopied,
  ] = useState(false);

  const time = useMemo(() => {
    return format(
      new Date(),
      "hh:mm a",
    );
  }, []);

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(
        message.content,
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {}
  }

  return (
    <div
      className={`flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`flex w-full max-w-5xl gap-3 ${
          isUser
            ? "flex-row-reverse"
            : ""
        }`}
      >
        {/* Avatar */}

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            isUser
              ? "bg-gradient-to-br from-indigo-500 to-violet-600"
              : "border border-emerald-500/20 bg-emerald-500/10"
          }`}
        >
          {isUser ? (
            <User size={18} />
          ) : (
            <Bot
              size={18}
              className="text-emerald-400"
            />
          )}
        </div>

        <div className="flex-1">

          {/* Header */}

          <div
            className={`mb-2 flex items-center gap-2 ${
              isUser
                ? "justify-end"
                : ""
            }`}
          >
            <span className="text-sm font-semibold text-white">
              {isUser
                ? "You"
                : "StudyCopilot"}
            </span>

            <span className="text-[11px] text-slate-500">
              {time}
            </span>

          </div>

          {/* Bubble */}

          <div
            className={`overflow-hidden rounded-3xl border ${
              isUser
                ? "border-indigo-500/20 bg-gradient-to-br from-indigo-500/15 to-violet-500/10"
                : "border-white/10 bg-white/[0.05]"
            }`}
          >
            <div className="prose prose-invert max-w-none break-words px-6 py-5 prose-p:leading-7 prose-p:my-3 prose-ul:my-3 prose-li:my-1 prose-headings:mb-3">

              <ReactMarkdown
                remarkPlugins={[
                  remarkGfm,
                ]}
              >
                {message.content}
              </ReactMarkdown>

            </div>

          </div>

          {!isUser && (
            <MessageActions
              copied={copied}
              onCopy={copyMessage}
            />
          )}

        </div>

      </div>

    </div>
  );
}