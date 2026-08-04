import type { ReactNode } from "react";

interface Props {
  sidebar: ReactNode;

  messages: ReactNode;

  suggestions?: ReactNode;

  input: ReactNode;
}

export default function ChatLayout({
  sidebar,
  messages,
  suggestions,
  input,
}: Props) {
  return (
    <section className="flex gap-6">

      {/* Sidebar */}

      <aside className="w-[280px] shrink-0">

        {sidebar}

      </aside>

      {/* Chat */}

      <div className="flex min-w-0 flex-1 flex-col">

        {/* Messages */}

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]">

          {messages}

        </div>

        {/* Suggestions */}

        {suggestions && (

          <div className="mt-4">

            {suggestions}

          </div>

        )}

        {/* Input */}

        <div className="mt-4">

          {input}

        </div>

      </div>

    </section>
  );
}