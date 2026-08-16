import { useCallback, useState } from "react";

import { askQuestion } from "../services/chat.service";

import type { ChatMessage } from "../types/chat.types";

export function useChat(contentId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(
    async (question: string) => {
      const text = question.trim();

      if (!text || loading || !contentId) {
        return;
      }

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: text,
        createdAt: new Date().toISOString(),
      };

      setMessages((previous) => [...previous, userMessage]);
      setLoading(true);

      try {
        const response = await askQuestion({
          contentId,
          question: text,
        });

        const answer =
          typeof response.answer === "string" && response.answer.trim()
            ? response.answer
            : "I couldn't generate an answer for that question.";

        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: answer,
          createdAt: new Date().toISOString(),
        };

        setMessages((previous) => [...previous, assistantMessage]);
      } catch (error) {
        console.error("Failed to send chat message:", error);

        const errorMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "I couldn't process that request right now. Please try again.",
          createdAt: new Date().toISOString(),
        };

        setMessages((previous) => [...previous, errorMessage]);
      } finally {
        setLoading(false);
      }
    },
    [contentId, loading],
  );

  const clearMessages = useCallback(() => {
    if (loading) return;
    setMessages([]);
  }, [loading]);

  return {
    messages,
    loading,
    sendMessage,
    clearMessages,
  };
}
