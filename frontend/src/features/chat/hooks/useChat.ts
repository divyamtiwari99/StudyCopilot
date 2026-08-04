import { useCallback, useState } from "react";

import { askQuestion } from "../services/chat.service";

import type {
  ChatMessage,
} from "../types/chat.types";

export function useChat(
  contentId: string,
) {
  const [
    messages,
    setMessages,
  ] = useState<ChatMessage[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const sendMessage =
    useCallback(
      async (
        question: string,
      ) => {
        const text =
          question.trim();

        if (!text || loading) {
          return;
        }

        const userMessage: ChatMessage =
          {
            id: crypto.randomUUID(),

            role: "user",

            content: text,

            createdAt:
              new Date().toISOString(),
          };

        setMessages((prev) => [
          ...prev,
          userMessage,
        ]);

        setLoading(true);

        try {
          const response =
            await askQuestion({
              contentId,
              question: text,
            });

          const assistantMessage: ChatMessage =
            {
              id: crypto.randomUUID(),

              role: "assistant",

              content:
                response.answer,

              createdAt:
                new Date().toISOString(),
            };

          setMessages((prev) => [
            ...prev,
            assistantMessage,
          ]);
        } finally {
          setLoading(false);
        }
      },
      [contentId, loading],
    );

  return {
    messages,

    loading,

    sendMessage,
  };
}