export type MessageRole = "user" | "assistant" | "system";

export type AIMode = "study" | "assistant" | "hybrid";
export type ResponseLength = "short" | "balanced" | "detailed";

export interface ChatAttachment {
  type: "image" | "document";
  name: string;
  mimeType: string;
  contentId?: string;
  status?: "uploading" | "processing" | "ready" | "failed";
  url?: string;
}

export interface ChatSource {
  chunkId: string;
  title: string;
  order: number;
  contentId: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  attachments?: ChatAttachment[];
  sources?: ChatSource[];
  status?: "pending" | "completed" | "failed";
  errorCode?: string;
  errorMessage?: string;
  retryCount?: number;
  clientRequestId?: string;
}

export interface ChatSession {
  _id: string;
  userId: string;
  contentId?: string | null;
  scope?: "tutor" | "document";
  documentIds: string[];
  title: string;
  lastMessage: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AskQuestionRequest {
  sessionId?: string;
  contentId?: string;
  documentIds?: string[];
  question: string;
  mode?: AIMode;
  responseLength?: ResponseLength;
  citations?: boolean;
  deepReasoning?: boolean;
  requestId?: string;
  attachments?: File[];
}

export interface AskQuestionResponse {
  success: boolean;
  answer: string;
  sessionId: string;
  sources: ChatSource[];
  attachments?: ChatAttachment[];
  userMessageId?: string;
  assistantMessageId?: string;
  requestId?: string;
}

export interface SuggestedQuestion {
  id: string;
  label: string;
  prompt: string;
}
