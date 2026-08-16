import {
  useEffect,
  useRef,
} from "react";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ChatEmptyState from "./ChatEmptyState";

import type {
  ChatMessage,
} from "../types/chat.types";

interface Props {
  messages: ChatMessage[];

  loading: boolean;

  onQuestion: (
    question: string,
  ) => void;
}

export default function ChatMessages({
  messages,
  loading,
  onQuestion,
}: Props) {
  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
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
    <div className="h-full overflow-y-auto">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 p-8">
        {messages.map(
          (message) => (
            <MessageBubble
              key={message.id}
              message={message}
            />
          ),
        )}

        {loading && (
          <TypingIndicator />
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}