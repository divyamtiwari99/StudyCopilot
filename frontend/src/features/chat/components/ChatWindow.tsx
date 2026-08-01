import { SendHorizontal } from "lucide-react";
import { useState } from "react";

export default function ChatWindow() {
  const [message, setMessage] =
    useState("");

  return (
    <div className="flex h-[650px] flex-col rounded-3xl border border-white/10 bg-[#090d18]">

      <div className="border-b border-white/10 px-8 py-6">

        <h2 className="text-2xl font-bold text-white">
          AI Study Chat
        </h2>

        <p className="mt-2 text-zinc-400">
          Ask anything about the uploaded
          document.
        </p>

      </div>

      <div className="flex-1 overflow-y-auto p-8">

        <div className="mx-auto max-w-3xl">

          <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-6">

            <p className="text-zinc-300">
              👋 Welcome to StudyCopilot.

              Start asking questions about your
              document.

            </p>

          </div>

        </div>

      </div>

      <div className="border-t border-white/10 p-6">

        <div className="flex gap-4">

          <textarea
            rows={1}
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Ask anything..."
            className="flex-1 resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition focus:border-cyan-500"
          />

          <button
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500 transition hover:bg-cyan-400"
          >
            <SendHorizontal size={22} />
          </button>

        </div>

      </div>

    </div>
  );
}