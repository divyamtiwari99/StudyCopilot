import { useMemo, useState } from "react";

import {
  Bot,
  User,
} from "lucide-react";

import { format } from "date-fns";

import MessageActions from "./MessageActions";
import MarkdownRenderer from "./MarkdownRenderer";

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
      new Date(message.createdAt),
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
    } catch (error) {
      console.error("Failed to copy message:", error);
    }
  }

  return (
    <div
      className={`
        flex
        ${
          isUser
            ? "justify-end"
            : "justify-start"
        }
      `}
    >
      <div
        className={`
          flex
          w-full
          max-w-5xl
          gap-3
          ${
            isUser
              ? "flex-row-reverse"
              : ""
          }
        `}
      >
        {/* Avatar */}

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            transition-all
            duration-300
          "
          style={{
            background: isUser
              ? "var(--accent-color)"
              : "color-mix(in srgb,var(--accent-color) 9%,var(--surface))",

            borderColor: isUser
              ? "color-mix(in srgb,var(--accent-color) 35%,transparent)"
              : "color-mix(in srgb,var(--accent-color) 20%,var(--border))",

            color: isUser
              ? "#ffffff"
              : "var(--accent-color)",

            boxShadow: isUser
              ? "0 8px 20px color-mix(in srgb,var(--accent-color) 18%,transparent)"
              : "none",
          }}
        >
          {isUser ? (
            <User size={18} />
          ) : (
            <Bot size={18} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          {/* Header */}

          <div
            className={`
              mb-2
              flex
              items-center
              gap-2
              ${
                isUser
                  ? "justify-end"
                  : ""
              }
            `}
          >
            <span
              className="
                text-sm
                font-semibold
              "
              style={{
                color:
                  "var(--text)",
              }}
            >
              {isUser
                ? "You"
                : "StudyCopilot"}
            </span>

            <span
              className="
                text-[11px]
              "
              style={{
                color:
                  "var(--muted)",
              }}
            >
              {time}
            </span>
          </div>

          {/* Bubble */}

          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              transition-all
              duration-300
            "
            style={{
              background: isUser
                ? "color-mix(in srgb,var(--accent-color) 9%,var(--surface))"
                : "var(--surface)",

              borderColor: isUser
                ? "color-mix(in srgb,var(--accent-color) 22%,var(--border))"
                : "var(--border)",

              boxShadow:
                "var(--shadow-card)",
            }}
          >
            <div
              className="
                prose
                max-w-none
                break-words
                px-6
                py-5
                prose-p:my-3
                prose-p:leading-7
                prose-ul:my-3
                prose-li:my-1
                prose-headings:mb-3
              "
              style={{
                color:
                  "var(--text)",
              }}
            >
              <MarkdownRenderer
                content={message.content}
              />
            </div>
          </div>

          {/* AI Actions */}

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