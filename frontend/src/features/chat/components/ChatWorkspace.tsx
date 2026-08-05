import { useDocument } from "@/features/dashboard/hooks/useDocument";

import { useChat } from "../hooks/useChat";

import ChatLayout from "./ChatLayout";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import SuggestedQuestions from "./SuggestedQuestions";
import DocumentSidebar from "./DocumentSidebar";

interface Props {
  contentId: string;
}

export default function ChatWorkspace({
  contentId,
}: Props) {
  const {
    messages,
    loading,
    sendMessage,
  } = useChat(contentId);

  const {
    data: document,
    isLoading,
  } = useDocument(contentId);

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />

          <p className="mt-6 text-slate-400">
            Loading workspace...
          </p>

        </div>

      </div>
    );
  }

  const title =
    document?.title ??
    document?.originalName ??
    "Document";

  const size =
    typeof document?.size ===
    "number"
      ? `${(
          document.size /
          1024 /
          1024
        ).toFixed(1)} MB`
      : document?.size ??
        "-";

  const status =
    document?.status ??
    "AI Ready";

  return (
    <ChatLayout
      sidebar={
        <DocumentSidebar
          title={title}
          pages={0}
          size={size}
          status={status}
        />
      }
      messages={
        <div className="flex h-full min-h-0 flex-col">

          <ChatHeader
            title={title}
            status={status}
            chunks={undefined}
          />

          <div className="min-h-0 flex-1">

            <ChatMessages
              messages={messages}
              loading={loading}
              onQuestion={(question) => {
                void sendMessage(
                  question,
                );
              }}
            />

          </div>

        </div>
      }
      suggestions={
        !messages.length ? (
          <SuggestedQuestions
            onSelect={(question) => {
              void sendMessage(
                question,
              );
            }}
          />
        ) : undefined
      }
      input={
        <ChatInput
          loading={loading}
          onSend={sendMessage}
        />
      }
    />
  );
}