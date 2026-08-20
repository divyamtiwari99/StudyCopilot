import { useEffect, useRef, useState } from "react";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ChatEmptyState from "./ChatEmptyState";

import type {
  ChatMessage,
} from "../types/chat.types";

interface Props {
  messages: ChatMessage[];

  loading: boolean;

  onQuestion: (question: string) => void;
  onRetry?: (messageId: string) => void;
}

export default function ChatMessages({
  messages,
  loading,
  onQuestion,
  onRetry,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [showJump, setShowJump] = useState(false);
  const nearBottomRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const distance = container.scrollHeight - container.scrollTop - container.clientHeight;
      nearBottomRef.current = distance < 120;
      setShowJump(distance >= 120);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (nearBottomRef.current) bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  if (!messages.length) {
    return (
      <div className="flex h-full flex-col">
        <ChatEmptyState
          onQuestion={onQuestion}
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-full overflow-y-auto">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 p-8">
        {messages.map(
          (message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onRetry={onRetry}
            />
          ),
        )}

        {loading && (
          <TypingIndicator />
        )}

        <div ref={bottomRef} />
      </div>
      {showJump ? (
        <button type="button" onClick={() => bottomRef.current?.scrollIntoView({ behavior: "smooth" })} className="sticky bottom-4 left-1/2 mx-auto block -translate-x-1/2 rounded-full border px-4 py-2 text-xs font-semibold shadow-lg" style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}>Jump to latest</button>
      ) : null}
    </div>
  );
}