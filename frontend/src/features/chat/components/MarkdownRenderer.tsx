import { useState } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";

import {
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import {
  Copy,
  Check,
} from "lucide-react";

interface Props {
  content: string;
}

export default function MarkdownRenderer({
  content,
}: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {
          const {
            children,
            className,
            ...rest
          } = props;

          const match =
            /language-(\w+)/.exec(
              className || "",
            );

          const language =
            match?.[1] ?? "text";

          const code = String(
            children,
          ).replace(/\n$/, "");

          if (!match) {
            return (
              <code
                className="
                  rounded-lg
                  border
                  px-2
                  py-1
                "
                style={{
                  background:
                    "var(--surfaceHover)",

                  borderColor:
                    "var(--border)",

                  color:
                    "var(--accent-color)",
                }}
                {...rest}
              >
                {children}
              </code>
            );
          }

          return (
            <CodeBlock
              language={language}
              code={code}
            />
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

interface CodeProps {
  language: string;

  code: string;
}

function CodeBlock({
  language,
  code,
}: CodeProps) {
  const [
    copied,
    setCopied,
  ] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(
        code,
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Failed to copy code:",
        error,
      );
    }
  }

  return (
    <div
      className="
        my-6
        overflow-hidden
        rounded-2xl
        border
        transition-all
        duration-300
      "
      style={{
        borderColor:
          "var(--border)",

        boxShadow:
          "var(--shadow-card)",
      }}
    >
      {/* Code header */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          px-4
          py-3
        "
        style={{
          background:
            "var(--surfaceHover)",

          borderColor:
            "var(--border)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="
              h-2
              w-2
              rounded-full
            "
            style={{
              backgroundColor:
                "var(--accent-color)",

              boxShadow:
                "0 0 8px color-mix(in srgb,var(--accent-color) 60%,transparent)",
            }}
          />

          <span
            className="
              text-xs
              font-semibold
              uppercase
              tracking-widest
            "
            style={{
              color:
                "var(--muted)",
            }}
          >
            {language}
          </span>
        </div>

        <button
          type="button"
          onClick={copy}
          className="
            flex
            items-center
            gap-2
            rounded-lg
            px-3
            py-1.5
            text-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
          "
          style={{
            color:
              copied
                ? "var(--success)"
                : "var(--text)",

            background:
              "transparent",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.background =
              "color-mix(in srgb,var(--accent-color) 8%,var(--surface))";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.background =
              "transparent";
          }}
        >
          {copied ? (
            <>
              <Check
                size={15}
                style={{
                  color:
                    "var(--success)",
                }}
              />

              Copied
            </>
          ) : (
            <>
              <Copy
                size={15}
                style={{
                  color:
                    "var(--accent-color)",
                }}
              />

              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}

      <div
        className="
          overflow-x-auto
        "
        style={{
          background:
            "var(--background)",
        }}
      >
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: 20,
            background:
              "var(--background)",
            fontSize: "14px",
            lineHeight: "1.7",
          }}
          codeTagProps={{
            style: {
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}