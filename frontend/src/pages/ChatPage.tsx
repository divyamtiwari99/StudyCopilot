import ChatHero from "@/features/chat/components/ChatHero";
import ChatDocumentGrid from "@/features/chat/components/ChatDocumentGrid";

export default function ChatPage() {
  return (
    <div className="space-y-10">

      <ChatHero />

      <ChatDocumentGrid />

    </div>
  );
}