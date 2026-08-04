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
                className="rounded-lg bg-white/10 px-2 py-1 text-indigo-300"
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
    await navigator.clipboard.writeText(
      code,
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-white/10">

      <div className="flex items-center justify-between border-b border-white/10 bg-[#141827] px-4 py-3">

        <span className="text-xs uppercase tracking-widest text-slate-400">
          {language}
        </span>

        <button
          onClick={copy}
          className="flex items-center gap-2 rounded-lg px-3 py-1 text-sm text-slate-300 transition hover:bg-white/10"
        >
          {copied ? (
            <>
              <Check size={15} />
              Copied
            </>
          ) : (
            <>
              <Copy size={15} />
              Copy
            </>
          )}
        </button>

      </div>

      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: 20,
          background: "#0B1020",
          fontSize: "14px",
        }}
      >
        {code}
      </SyntaxHighlighter>

    </div>
  );
}