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
    <section
      className="
        flex
        min-w-0
        flex-col
        gap-6
        xl:flex-row
      "
    >
      {/* Sidebar */}

      <aside
        className="
          w-full
          shrink-0
          xl:w-[280px]
        "
      >
        {sidebar}
      </aside>

      {/* Chat workspace */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
        "
      >
        {/* Messages */}

        <div
          className="
            min-h-[520px]
            overflow-hidden
            rounded-[28px]
            border
            backdrop-blur-xl
            transition-all
            duration-300
          "
          style={{
            background:
              "var(--surfaceHover)",

            borderColor:
              "var(--border)",

            boxShadow:
              "var(--shadow-card)",
          }}
        >
          {messages}
        </div>

        {/* Suggestions */}

        {suggestions && (
          <div
            className="
              mt-4
              min-w-0
              transition-all
              duration-300
            "
          >
            {suggestions}
          </div>
        )}

        {/* Input */}

        <div
          className="
            mt-4
            min-w-0
          "
        >
          {input}
        </div>
      </div>
    </section>
  );
}