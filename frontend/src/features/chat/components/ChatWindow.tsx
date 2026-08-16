import { useParams } from "react-router-dom";

import ChatWorkspace from "./ChatWorkspace";

/**
 * Legacy compatibility entry point.
 *
 * The canonical chat implementation lives in ChatWorkspace. Keeping this
 * wrapper prevents older imports from breaking while avoiding a second chat
 * implementation with its own state/types.
 */
export default function ChatWindow() {
  const { contentId } = useParams();

  if (!contentId) {
    return (
      <div
        className="flex min-h-64 items-center justify-center rounded-3xl border p-8 text-center"
        style={{
          borderColor: "var(--border)",
          background: "var(--surface)",
          color: "var(--muted)",
        }}
      >
        No document selected.
      </div>
    );
  }

  return <ChatWorkspace contentId={contentId} />;
}
