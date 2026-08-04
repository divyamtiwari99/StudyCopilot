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

    await onSend(text);

    setQuestion("");
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
      className="rounded-[30px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-3xl"
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
          className="min-h-[60px] flex-1 resize-none bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
        />

        <button
          type="submit"
          disabled={
            loading ||
            !question.trim()
          }
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <Loader2
              className="animate-spin"
              size={22}
            />
          ) : (
            <SendHorizonal
              size={22}
            />
          )}
        </button>

      </div>
    </form>
  );
}