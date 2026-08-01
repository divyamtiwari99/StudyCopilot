import { SendHorizontal } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";

import { useChat } from "../hooks/useChat";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatWindow() {
  const { contentId } = useParams();

  const chat = useChat();

  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState<Message[]>([]);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function sendMessage() {
    console.log("========== CHAT ==========");
    console.log("contentId:", contentId);
    console.log("question:", question);

    if (!question.trim()) {
      console.log("Question Empty");
      return;
    }

    if (!contentId) {
      console.log("ContentId Missing");
      return;
    }

    const current = question;

    setQuestion("");

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: current,
      },
    ]);

    try {
      console.log("Sending Request...");

      const response =
        await chat.mutateAsync({
          contentId,
          question: current,
        });

      console.log("Response:", response);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.answer,
        },
      ]);
    } catch (error) {
      console.error("CHAT ERROR:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Something went wrong while talking to AI.",
        },
      ]);
    }
  }

  return (
    <div className="flex h-[700px] flex-col rounded-3xl border border-white/10 bg-[#090d18]">
      <div className="border-b border-white/10 px-8 py-6">
        <h2 className="text-2xl font-bold text-white">
          AI Study Chat
        </h2>

        <p className="mt-2 text-zinc-400">
          Ask questions from your uploaded
          document.
        </p>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-8">
        {messages.length === 0 && (
          <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-6">
            <p className="text-zinc-300">
              👋 Ask your first question.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-3xl rounded-3xl p-5 ${
              message.role === "user"
                ? "ml-auto bg-cyan-500 text-white"
                : "border border-white/10 bg-white/5 text-zinc-200"
            }`}
          >
            {message.content}
          </div>
        ))}

        {chat.isPending && (
          <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-5 text-zinc-400">
            Thinking...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="border-t border-white/10 p-6">
        <div className="flex gap-4">
          <textarea
            rows={1}
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask anything..."
            className="flex-1 resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none focus:border-cyan-500"
          />

          <button
            type="button"
            onClick={sendMessage}
            disabled={chat.isPending}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500 text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SendHorizontal size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}