import {
  Check,
  Copy,
  Share2,
  RotateCcw,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

interface Props {
  copied: boolean;

  onCopy: () => void;
}

export default function MessageActions({
  copied,
  onCopy,
}: Props) {
  return (
    <div
      className="
        mt-4
        flex
        flex-wrap
        items-center
        gap-2
      "
    >
      {/* Copy */}

      <button
        type="button"
        onClick={onCopy}
        className="
          group
          flex
          items-center
          gap-2
          rounded-xl
          border
          px-3
          py-2
          text-sm
          transition-all
          duration-200
          hover:-translate-y-0.5
        "
        style={{
          background:
            "var(--surfaceHover)",

          borderColor:
            "var(--border)",

          color:
            copied
              ? "var(--success)"
              : "var(--text)",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.borderColor =
            copied
              ? "color-mix(in srgb,var(--success) 30%,var(--border))"
              : "color-mix(in srgb,var(--accent-color) 30%,var(--border))";

          event.currentTarget.style.background =
            copied
              ? "color-mix(in srgb,var(--success) 8%,var(--surfaceHover))"
              : "color-mix(in srgb,var(--accent-color) 8%,var(--surfaceHover))";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.borderColor =
            "var(--border)";

          event.currentTarget.style.background =
            "var(--surfaceHover)";
        }}
      >
        {copied ? (
          <>
            <Check
              size={16}
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
              size={16}
              style={{
                color:
                  "var(--accent-color)",
              }}
            />

            Copy
          </>
        )}
      </button>

      {/* Like */}

      <button
        type="button"
        aria-label="Like response"
        className="
          group
          rounded-xl
          border
          p-2
          transition-all
          duration-200
          hover:-translate-y-0.5
        "
        style={{
          background:
            "var(--surfaceHover)",

          borderColor:
            "var(--border)",

          color:
            "var(--muted)",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.borderColor =
            "color-mix(in srgb,var(--success) 30%,var(--border))";

          event.currentTarget.style.background =
            "color-mix(in srgb,var(--success) 8%,var(--surfaceHover))";

          event.currentTarget.style.color =
            "var(--success)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.borderColor =
            "var(--border)";

          event.currentTarget.style.background =
            "var(--surfaceHover)";

          event.currentTarget.style.color =
            "var(--muted)";
        }}
      >
        <ThumbsUp size={16} />
      </button>

      {/* Dislike */}

      <button
        type="button"
        aria-label="Dislike response"
        className="
          group
          rounded-xl
          border
          p-2
          transition-all
          duration-200
          hover:-translate-y-0.5
        "
        style={{
          background:
            "var(--surfaceHover)",

          borderColor:
            "var(--border)",

          color:
            "var(--muted)",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.borderColor =
            "color-mix(in srgb,var(--danger) 30%,var(--border))";

          event.currentTarget.style.background =
            "color-mix(in srgb,var(--danger) 8%,var(--surfaceHover))";

          event.currentTarget.style.color =
            "var(--danger)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.borderColor =
            "var(--border)";

          event.currentTarget.style.background =
            "var(--surfaceHover)";

          event.currentTarget.style.color =
            "var(--muted)";
        }}
      >
        <ThumbsDown size={16} />
      </button>

      {/* Regenerate */}

      <button
        type="button"
        aria-label="Regenerate response"
        className="
          group
          rounded-xl
          border
          p-2
          transition-all
          duration-200
          hover:-translate-y-0.5
        "
        style={{
          background:
            "var(--surfaceHover)",

          borderColor:
            "var(--border)",

          color:
            "var(--muted)",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.borderColor =
            "color-mix(in srgb,var(--accent-color) 30%,var(--border))";

          event.currentTarget.style.background =
            "color-mix(in srgb,var(--accent-color) 8%,var(--surfaceHover))";

          event.currentTarget.style.color =
            "var(--accent-color)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.borderColor =
            "var(--border)";

          event.currentTarget.style.background =
            "var(--surfaceHover)";

          event.currentTarget.style.color =
            "var(--muted)";
        }}
      >
        <RotateCcw
          size={16}
          className="
            transition-transform
            duration-300
            group-hover:rotate-[-35deg]
          "
        />
      </button>

      {/* Share */}

      <button
        type="button"
        aria-label="Share response"
        className="
          group
          rounded-xl
          border
          p-2
          transition-all
          duration-200
          hover:-translate-y-0.5
        "
        style={{
          background:
            "var(--surfaceHover)",

          borderColor:
            "var(--border)",

          color:
            "var(--muted)",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.borderColor =
            "color-mix(in srgb,var(--accent-color) 30%,var(--border))";

          event.currentTarget.style.background =
            "color-mix(in srgb,var(--accent-color) 8%,var(--surfaceHover))";

          event.currentTarget.style.color =
            "var(--accent-color)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.borderColor =
            "var(--border)";

          event.currentTarget.style.background =
            "var(--surfaceHover)";

          event.currentTarget.style.color =
            "var(--muted)";
        }}
      >
        <Share2
          size={16}
          className="
            transition-transform
            duration-300
            group-hover:scale-110
          "
        />
      </button>
    </div>
  );
}