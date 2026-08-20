export interface ChatSource {
  chunkId: string;
  title: string;
  order: number;
  contentId: string;
}

export interface ChatAttachmentResponse {
  type: "image" | "document";
  name: string;
  mimeType: string;
  contentId?: string;
  status?: "uploading" | "processing" | "ready" | "failed";
  url?: string;
}

export interface ChatResponse {
  success: boolean;
  answer: string;
  sessionId: string;
  userMessageId?: string;
  assistantMessageId?: string;
  requestId?: string;
  sources: ChatSource[];
  attachments?: ChatAttachmentResponse[];
}
