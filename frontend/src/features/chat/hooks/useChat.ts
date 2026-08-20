import { useQueryClient } from "@tanstack/react-query";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useSettingsContext } from "@/features/settings/components/SettingsContext";
import { queryKeys } from "@/lib/queryKeys";
import { getApiErrorMessage } from "@/lib/api";
import { useDocuments } from "@/features/documents/hooks/useDocuments";

import {
  askQuestion,
  createSession,
  deleteSession,
  getSessionMessages,
  getSessions,
  renameSession,
  retryMessage as retryChatMessage,
  updateSessionContext,
} from "../services/chat.service";

import type {
  ChatMessage,
  ChatSession,
} from "../types/chat.types";

export function useChat(contentId?: string) {
  const { settings } = useSettingsContext();
  const queryClient = useQueryClient();
  const { data: documents = [] } = useDocuments();
  const scope: "tutor" | "document" = contentId
    ? "document"
    : "tutor";

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [sessionLoading, setSessionLoading] = useState(false);

  const sessionRef = useRef<ChatSession | null>(null);
  const loadingRef = useRef(false);

  const syncSession = useCallback((next: ChatSession | null) => {
    sessionRef.current = next;
    setSession(next);
  }, []);

  const refreshSessions = useCallback(async () => {
    const nextSessions = await getSessions(contentId, scope);
    setSessions(nextSessions);
    return nextSessions;
  }, [contentId, scope]);

  const openSession = useCallback(
    async (nextSession: ChatSession) => {
      setSessionLoading(true);
      try {
        const nextMessages = await getSessionMessages(nextSession._id);
        syncSession(nextSession);
        setMessages(nextMessages);
      } finally {
        setSessionLoading(false);
      }
    },
    [syncSession],
  );

  const ensureSession = useCallback(async () => {
    if (sessionRef.current) {
      return sessionRef.current;
    }

    const available = await refreshSessions();
    const latest = available[0];

    if (latest) {
      await openSession(latest);
      return latest;
    }

    const created = await createSession({
      contentId,
      documentIds: contentId ? [contentId] : [],
    });

    syncSession(created);
    setSessions((previous) => [created, ...previous]);
    setMessages([]);

    return created;
  }, [contentId, openSession, refreshSessions, syncSession]);

  useEffect(() => {
    if (!documents.length) return;

    const byId = new Map(documents.map((document) => [document.id, document]));
    setMessages((previous) => {
      let anyChanged = false;
      const next = previous.map((message) => {
        if (!message.attachments?.length) return message;
        let messageChanged = false;
        const attachments = message.attachments.map((attachment) => {
          if (attachment.type !== "document" || !attachment.contentId) return attachment;
          const document = byId.get(attachment.contentId);
          if (!document) return attachment;
          const status = document.status;
          if (status === attachment.status) return attachment;
          messageChanged = true;
          anyChanged = true;
          return { ...attachment, status };
        });
        return messageChanged ? { ...message, attachments } : message;
      });
      return anyChanged ? next : previous;
    });
  }, [documents]);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      setInitializing(true);
      setMessages([]);
      syncSession(null);

      try {
        const available = await refreshSessions();
        if (cancelled) return;

        if (available[0]) {
          await openSession(available[0]);
        } else {
          const created = await createSession({
            contentId,
            documentIds: contentId ? [contentId] : [],
          });

          if (cancelled) return;

          syncSession(created);
          setSessions([created]);
          setMessages([]);
        }
      } catch (error) {
        console.error("Failed to restore chat:", error);
      } finally {
        if (!cancelled) setInitializing(false);
      }
    }

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, [contentId, openSession, refreshSessions, syncSession]);

  const sendMessage = useCallback(
    async (question: string, attachments: File[] = []) => {
      const text = question.trim();
      if ((!text && !attachments.length) || loadingRef.current) return;

      const activeSession = await ensureSession();
      const displayText = text || "Analyze this attachment.";
      const requestId = crypto.randomUUID();
      const optimistic: ChatMessage = {
        id: requestId,
        clientRequestId: requestId,
        role: "user",
        content: displayText,
        createdAt: new Date().toISOString(),
        status: "pending",
        attachments: attachments.length
          ? attachments.map((attachment) => ({
              type: attachment.type.startsWith("image/") ? "image" as const : "document" as const,
              name: attachment.name,
              mimeType: attachment.type,
              status: "uploading" as const,
            }))
          : undefined,
      };

      setMessages((previous) => [...previous, optimistic]);
      loadingRef.current = true;
      setLoading(true);

      try {
        const response = await askQuestion({
          sessionId: activeSession._id,
          contentId: contentId ?? undefined,
          documentIds: activeSession.documentIds,
          question: displayText,
          mode: settings.ai.defaultMode,
          responseLength: settings.ai.responseLength,
          citations: settings.ai.citations,
          deepReasoning: settings.ai.deepReasoning,
          requestId,
          attachments,
        });

        const assistantMessage: ChatMessage = {
          id: response.assistantMessageId ?? crypto.randomUUID(),
          role: "assistant",
          content: response.answer?.trim() || "I couldn't generate an answer right now.",
          createdAt: new Date().toISOString(),
          status: "completed",
          sources: response.sources,
        };

        setMessages((previous) => {
          const updated = previous.map((message) =>
            message.id === optimistic.id
              ? {
                  ...message,
                  id: response.userMessageId ?? message.id,
                  status: "completed" as const,
                  attachments: response.attachments ?? message.attachments,
                }
              : message,
          );
          if (updated.some((message) => message.id === assistantMessage.id)) return updated;
          return [...updated, assistantMessage];
        });

        if (response.attachments?.some((item) => item.type === "document")) {
          void queryClient.invalidateQueries({ queryKey: queryKeys.documents() });
        }

        const refreshed = await refreshSessions();
        const matched = refreshed.find((item) => item._id === response.sessionId);
        if (matched) syncSession(matched);
      } catch (error) {
        console.error("Failed to send chat message:", error);
        const message = getApiErrorMessage(error, "AI generation failed. You can retry this message.");
        setMessages((previous) => previous.map((item) =>
          item.id === optimistic.id
            ? { ...item, status: "failed", errorMessage: message, attachments: item.attachments?.map((attachment) => ({ ...attachment, status: "failed" as const })) }
            : item,
        ));
        throw error;
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [contentId, ensureSession, queryClient, refreshSessions, settings, syncSession],
  );

  const retryMessage = useCallback(
    async (messageId: string) => {
      const activeSession = sessionRef.current;
      if (!activeSession || loadingRef.current) return;
      loadingRef.current = true;
      setLoading(true);
      setMessages((previous) => previous.map((message) => message.id === messageId ? { ...message, status: "pending", errorMessage: undefined } : message));
      try {
        const response = await retryChatMessage(activeSession._id, messageId);
        const assistant: ChatMessage = {
          id: response.assistantMessageId ?? crypto.randomUUID(),
          role: "assistant",
          content: response.answer,
          createdAt: new Date().toISOString(),
          status: "completed",
          sources: response.sources,
        };
        setMessages((previous) => {
          const updated = previous.map((message) => message.id === messageId
            ? { ...message, status: "completed" as const, attachments: response.attachments ?? message.attachments }
            : message);
          return updated.some((message) => message.id === assistant.id) ? updated : [...updated, assistant];
        });
        const refreshed = await refreshSessions();
        const matched = refreshed.find((item) => item._id === response.sessionId);
        if (matched) syncSession(matched);
      } catch (error) {
        const message = getApiErrorMessage(error, "AI generation failed. You can retry this message.");
        setMessages((previous) => previous.map((item) => item.id === messageId ? { ...item, status: "failed", errorMessage: message } : item));
        throw error;
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [refreshSessions, syncSession],
  );

  const createNewChat = useCallback(async () => {
    if (loadingRef.current) return;

    const created = await createSession({
      contentId,
      documentIds: sessionRef.current?.documentIds ??
        (contentId ? [contentId] : []),
    });

    syncSession(created);
    setMessages([]);
    setSessions((previous) => [created, ...previous]);
  }, [contentId, syncSession]);

  const selectSession = useCallback(
    async (nextSession: ChatSession) => {
      if (loadingRef.current) return;
      await openSession(nextSession);
    },
    [openSession],
  );

  const setDocumentContext = useCallback(
    async (documentIds: string[]) => {
      const activeSession = await ensureSession();
      const updated = await updateSessionContext(
        activeSession._id,
        documentIds,
      );
      syncSession(updated);
      setSessions((previous) =>
        previous.map((item) =>
          item._id === updated._id ? updated : item,
        ),
      );
    },
    [ensureSession, syncSession],
  );

  const clearMessages = useCallback(async () => {
    await createNewChat();
  }, [createNewChat]);

  const rename = useCallback(
    async (title: string) => {
      if (!sessionRef.current) return;

      const updated = await renameSession(
        sessionRef.current._id,
        title,
      );

      syncSession(updated);
      setSessions((previous) =>
        previous.map((item) =>
          item._id === updated._id ? updated : item,
        ),
      );
    },
    [syncSession],
  );

  const removeSession = useCallback(
    async (sessionId: string) => {
      if (loadingRef.current) return;

      await deleteSession(sessionId);

      const remaining = await refreshSessions();

      if (sessionRef.current?._id === sessionId) {
        if (remaining[0]) {
          await openSession(remaining[0]);
        } else {
          const created = await createSession({
            contentId,
            documentIds: contentId ? [contentId] : [],
          });
          syncSession(created);
          setSessions([created]);
          setMessages([]);
        }
      }
    }, [contentId, openSession, refreshSessions, syncSession],
  );

  return {
    messages,
    sessions,
    session,
    loading,
    initializing,
    sessionLoading,
    sendMessage,
    retryMessage,
    clearMessages,
    createNewChat,
    selectSession,
    setDocumentContext,
    rename,
    removeSession,
  };
}
