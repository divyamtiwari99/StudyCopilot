import {
  BrainCircuit,
  FileText,
  Plus,
  Sparkles,
} from "lucide-react";

interface Props {
  title: string;
  status: string;
  chunks?: number;
  onNewChat?: () => void;
}

export default function ChatHeader({
  title,
  status,
  chunks,
  onNewChat,
}: Props) {
  return (
    <header
      className="
        border-b
        px-6
        py-4
        backdrop-blur-xl
      "
      style={{
        background:
          "color-mix(in srgb,var(--surfaceHover) 92%,transparent)",

        borderColor:
          "var(--border)",
      }}
    >
      <div className="flex items-center justify-between gap-6">
        {/* Left */}

        <div className="flex min-w-0 items-center gap-4">
          {/* Document icon */}

          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              transition-all
              duration-300
            "
            style={{
              background:
                "color-mix(in srgb,var(--accent-color) 11%,transparent)",

              borderColor:
                "color-mix(in srgb,var(--accent-color) 22%,var(--border))",

              color:
                "var(--accent-color)",

              boxShadow:
                "0 8px 24px color-mix(in srgb,var(--accent-color) 8%,transparent)",
            }}
          >
            <FileText
              size={26}
              strokeWidth={1.8}
            />
          </div>

          <div className="min-w-0">
            <h2
              className="
                truncate
                text-2xl
                font-bold
                tracking-tight
                sm:text-3xl
              "
              style={{
                color:
                  "var(--text)",
              }}
              title={title}
            >
              {title}
            </h2>

            <div
              className="
                mt-2
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              {/* Status */}

              <span
                className="
                  inline-flex
                  items-center
                  rounded-full
                  border
                  px-3
                  py-1
                  text-xs
                  font-semibold
                "
                style={{
                  color:
                    "var(--success)",

                  background:
                    "color-mix(in srgb,var(--success) 9%,transparent)",

                  borderColor:
                    "color-mix(in srgb,var(--success) 22%,var(--border))",
                }}
              >
                {status}
              </span>

              {/* AI model */}

              <span
                className="
                  flex
                  items-center
                  gap-1.5
                  text-sm
                "
                style={{
                  color:
                    "var(--muted)",
                }}
              >
                <Sparkles
                  size={14}
                  style={{
                    color:
                      "var(--accent-color)",
                  }}
                />

                Document-grounded AI
              </span>

              {/* Chunks */}

              <span
                className="
                  flex
                  items-center
                  gap-1.5
                  text-sm
                "
                style={{
                  color:
                    "var(--muted)",
                }}
              >
                <BrainCircuit
                  size={14}
                  style={{
                    color:
                      "var(--accent-color)",
                  }}
                />

                {chunks ?? "--"} Chunks
              </span>
            </div>
          </div>
        </div>

        {/* Right */}

        {onNewChat && (
          <button
            type="button"
            onClick={onNewChat}
            disabled={!onNewChat}
            className="
            group
            flex
            shrink-0
            items-center
            gap-2
            rounded-2xl
            border
            px-5
            py-3
            text-sm
            font-medium
            transition-all
            duration-300
            hover:-translate-y-0.5
          "
          style={{
            background:
              "var(--surface)",

            borderColor:
              "var(--border)",

            color:
              "var(--text)",

            boxShadow:
              "var(--shadow-card)",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.borderColor =
              "color-mix(in srgb,var(--accent-color) 30%,var(--border))";

            event.currentTarget.style.background =
              "color-mix(in srgb,var(--accent-color) 7%,var(--surface))";

            event.currentTarget.style.boxShadow =
              "var(--shadow-hover)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.borderColor =
              "var(--border)";

            event.currentTarget.style.background =
              "var(--surface)";

            event.currentTarget.style.boxShadow =
              "var(--shadow-card)";
          }}
        >
          <Plus
            size={18}
            className="
              transition-transform
              duration-300
              group-hover:rotate-90
            "
            style={{
              color:
                "var(--accent-color)",
            }}
          />

            New Chat
          </button>
        )}
      </div>
    </header>
  );
}