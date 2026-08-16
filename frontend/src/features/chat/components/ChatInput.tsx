import { useState } from "react";

import type {
  FormEvent,
  KeyboardEvent,
} from "react";

import {
  Loader2,
  SendHorizonal,
} from "lucide-react";

interface Props {
  loading: boolean;

  onSend: (
    question: string,
  ) => Promise<void>;
}

export default function ChatInput({
  loading,
  onSend,
}: Props) {
  const [
    question,
    setQuestion,
  ] = useState("");

  async function submitMessage() {
    const text =
      question.trim();

    if (!text || loading) {
      return;
    }

    setQuestion("");
    await onSend(text);
  }

  async function handleSubmit(
    e: FormEvent,
  ) {
    e.preventDefault();

    await submitMessage();
  }

  async function handleKeyDown(
    e: KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();

      await submitMessage();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-[30px]
        border
        p-4
        backdrop-blur-3xl
        transition-all
        duration-300
      "
      style={{
        background:
          "var(--surface)",

        borderColor:
          "var(--border)",

        boxShadow:
          "var(--shadow-card)",
      }}
    >
      <div className="flex items-end gap-4">
        <textarea
          rows={2}
          value={question}
          onChange={(e) =>
            setQuestion(
              e.target.value,
            )
          }
          onKeyDown={
            handleKeyDown
          }
          placeholder="Ask anything about this document..."
          className="
            min-h-[60px]
            flex-1
            resize-none
            bg-transparent
            text-[var(--text)]
            placeholder:text-[var(--muted)]
            focus:outline-none
          "
          style={{
            caretColor:
              "var(--accent-color)",
          }}
        />

        <button
          type="submit"
          disabled={
            loading ||
            !question.trim()
          }
          aria-label={
            loading
              ? "Sending message"
              : "Send message"
          }
          className="
            group
            relative
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-2xl
            text-white
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:brightness-105
            active:translate-y-0
            disabled:cursor-not-allowed
            disabled:opacity-50
            disabled:hover:translate-y-0
          "
          style={{
            background:
              "var(--accent-color)",

            color:
              "#ffffff",

            boxShadow:
              "0 10px 26px color-mix(in srgb,var(--accent-color) 22%,transparent)",
          }}
        >
          {/* Button shine */}

          <span
            className="
              pointer-events-none
              absolute
              inset-0
              -translate-x-full
              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent
              transition-transform
              duration-700
              group-hover:translate-x-full
            "
          />

          {loading ? (
            <Loader2
              className="
                relative
                z-10
                animate-spin
              "
              size={22}
              style={{
                color:
                  "#ffffff",
              }}
            />
          ) : (
            <SendHorizonal
              className="
                relative
                z-10
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
              size={22}
              style={{
                color:
                  "#ffffff",
              }}
            />
          )}
        </button>
      </div>
    </form>
  );
}