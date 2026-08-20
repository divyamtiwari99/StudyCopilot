import { api } from "@/lib/api";

import type {
  AIMode,
  AskQuestionRequest,
  AskQuestionResponse,
  ChatMessage,
  ChatSession,
  ResponseLength,
} from "../types/chat.types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export async function createSession(payload?: {
  contentId?: string;
  documentIds?: string[];
  title?: string;
}): Promise<ChatSession> {
  const { data } = await api.post<ApiResponse<ChatSession>>(
    "/chat/sessions",
    payload ?? {},
  );

  return data.data;
}

export async function getSessions(
  contentId?: string,
  scope: "tutor" | "document" = contentId ? "document" : "tutor",
): Promise<ChatSession[]> {
  const { data } = await api.get<ApiResponse<ChatSession[]>>(
    "/chat/sessions",
    {
      params: {
        ...(contentId ? { contentId } : {}),
        scope,
      },
    },
  );

  return data.data;
}

export async function getSessionMessages(
  sessionId: string,
): Promise<ChatMessage[]> {
  const { data } = await api.get<ApiResponse<ChatMessage[]>>(
    `/chat/sessions/${sessionId}/messages`,
  );

  return data.data.map((message) => ({
    ...message,
    id: message.id ?? (message as ChatMessage & { _id?: string })._id ?? crypto.randomUUID(),
  }));
}

export async function updateSessionContext(
  sessionId: string,
  documentIds: string[],
): Promise<ChatSession> {
  const { data } = await api.patch<ApiResponse<ChatSession>>(
    `/chat/sessions/${sessionId}/context`,
    { documentIds },
  );

  return data.data;
}

export async function renameSession(
  sessionId: string,
  title: string,
): Promise<ChatSession> {
  const { data } = await api.patch<ApiResponse<ChatSession>>(
    `/chat/sessions/${sessionId}`,
    { title },
  );

  return data.data;
}

export async function deleteSession(sessionId: string): Promise<void> {
  await api.delete(`/chat/sessions/${sessionId}`);
}

export async function askQuestion(
  payload: AskQuestionRequest,
): Promise<AskQuestionResponse> {
  const formData = new FormData();

  if (payload.sessionId) formData.append("sessionId", payload.sessionId);
  if (payload.contentId) formData.append("contentId", payload.contentId);
  if (payload.documentIds) {
    formData.append("documentIds", JSON.stringify(payload.documentIds));
  }

  formData.append("question", payload.question);
  if (payload.requestId) formData.append("requestId", payload.requestId);

  if (payload.mode) formData.append("mode", payload.mode as AIMode);
  if (payload.responseLength) {
    formData.append("responseLength", payload.responseLength as ResponseLength);
  }
  if (typeof payload.citations === "boolean") {
    formData.append("citations", String(payload.citations));
  }
  if (typeof payload.deepReasoning === "boolean") {
    formData.append("deepReasoning", String(payload.deepReasoning));
  }
  for (const attachment of payload.attachments ?? []) {
    formData.append("attachments", attachment);
  }

  const { data } = await api.post<AskQuestionResponse>(
    "/chat/ask",
    formData,
  );

  return data;
}


export async function retryMessage(sessionId: string, messageId: string): Promise<AskQuestionResponse> {
  const { data } = await api.post<AskQuestionResponse>(`/chat/sessions/${sessionId}/messages/${messageId}/retry`);
  return data;
}
