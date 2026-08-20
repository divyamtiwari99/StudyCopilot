import AITutorWorkspace from "@/features/chat/components/AITutorWorkspace";
import ChatDocumentGrid from "@/features/chat/components/ChatDocumentGrid";

export default function ChatPage() {
  return (
    <div className="space-y-10">
      <AITutorWorkspace />

      <section className="pt-2">
        <ChatDocumentGrid />
      </section>
    </div>
  );
}
