export type MessageRole =
  | "user"
  | "assistant";

export interface ChatMessage {
  id: string;

  role: MessageRole;

  content: string;

  createdAt: string;
}

export interface AskQuestionRequest {
  contentId: string;

  question: string;
}

export interface AskQuestionResponse {
  success: boolean;

  answer: string;
}

export interface SuggestedQuestion {
  id: string;

  label: string;

  prompt: string;
}