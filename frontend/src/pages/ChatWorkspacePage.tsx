import { Navigate, useParams } from "react-router-dom";

import ChatWorkspace from "@/features/chat/components/ChatWorkspace";

export default function ChatWorkspacePage() {
  const { contentId } =
    useParams();

  if (!contentId) {
    return (
      <Navigate
        to="/dashboard/chat"
        replace
      />
    );
  }

  return (
    <ChatWorkspace
      contentId={contentId}
    />
  );
}