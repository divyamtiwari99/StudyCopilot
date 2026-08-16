import { Sparkles } from "lucide-react";

export default function ChatHero() {
  return (
    <section
      className="
        group
        relative
        overflow-hidden
        rounded-[32px]
        border
        p-8
        backdrop-blur-3xl
        transition-all
        duration-300
        hover:-translate-y-0.5
        sm:p-10
      "
      style={{
        background:
          "var(--surface)",

        borderColor:
          "var(--border)",

        boxShadow:
          "var(--shadow-soft)",
      }}
    >
      {/* Accent glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-64
          w-64
          rounded-full
          blur-[120px]
          opacity-20
          transition-opacity
          duration-500
          group-hover:opacity-30
        "
        style={{
          background:
            "var(--accent-color)",
        }}
      />

      {/* Secondary glow */}

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -left-24
          h-48
          w-48
          rounded-full
          blur-[100px]
          opacity-10
        "
        style={{
          background:
            "var(--accent-color)",
        }}
      />

      <div className="relative z-10">
        {/* Label */}

        <div
          className="
            mb-6
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            px-4
            py-2
            transition-all
            duration-300
            group-hover:-translate-y-0.5
          "
          style={{
            color:
              "var(--accent-color)",

            background:
              "color-mix(in srgb,var(--accent-color) 9%,transparent)",

            borderColor:
              "color-mix(in srgb,var(--accent-color) 22%,var(--border))",
          }}
        >
          <Sparkles
            size={16}
            strokeWidth={1.8}
            className="
              transition-transform
              duration-500
              group-hover:rotate-12
            "
          />

          <span className="text-sm font-semibold">
            AI Tutor
          </span>
        </div>

        {/* Heading */}

        <h1
          className="
            max-w-3xl
            text-4xl
            font-bold
            leading-tight
            tracking-tight
            sm:text-5xl
          "
          style={{
            color:
              "var(--text)",
          }}
        >
          Learn with your own
          documents using AI.
        </h1>

        {/* Description */}

        <p
          className="
            mt-6
            max-w-2xl
            text-base
            leading-8
            sm:text-lg
          "
          style={{
            color:
              "var(--muted)",
          }}
        >
          Choose any uploaded
          document and start an
          intelligent conversation.
          Ask questions, understand
          concepts, summarize chapters,
          generate examples and learn
          faster with contextual AI.
        </p>
      </div>
    </section>
  );
}