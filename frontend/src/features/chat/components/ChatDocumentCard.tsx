import { Link } from "react-router-dom";

import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  FileText,
  XCircle,
} from "lucide-react";

export interface ChatDocument {
  id: string;

  title: string;


  size: string;

  status:
    | "uploading"
    | "processing"
    | "ready"
    | "failed";
}

interface Props {
  document: ChatDocument;
}

function StatusBadge({
  status,
}: {
  status: ChatDocument["status"];
}) {
  const config = {
    uploading: {
      color: "var(--info)",
      label: "Uploading",
      icon: Clock3,
      animation:
        "animate-pulse",
    },

    processing: {
      color: "var(--warning)",
      label: "Processing",
      icon: Clock3,
      animation:
        "animate-spin",
    },

    failed: {
      color: "var(--danger)",
      label: "Failed",
      icon: XCircle,
      animation: "",
    },

    ready: {
      color: "var(--success)",
      label: "AI Ready",
      icon: CheckCircle2,
      animation: "",
    },
  } as const;

  const current =
    config[status];

  if (!current) {
    return null;
  }

  const Icon = current.icon;

  return (
    <div
      className="
        inline-flex
        shrink-0
        items-center
        gap-2
        rounded-full
        border
        px-3
        py-1.5
        text-xs
        font-semibold
        transition-all
        duration-300
      "
      style={{
        color:
          current.color,

        background:
          `color-mix(in srgb,${current.color} 9%,transparent)`,

        borderColor:
          `color-mix(in srgb,${current.color} 24%,var(--border))`,
      }}
    >
      <Icon
        size={14}
        className={
          current.animation
        }
      />

      {current.label}
    </div>
  );
}

export default function ChatDocumentCard({
  document,
}: Props) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        p-6
        backdrop-blur-3xl
        transition-all
        duration-300
        hover:-translate-y-1
      "
      style={{
        background:
          "var(--surface)",

        borderColor:
          "var(--border)",

        boxShadow:
          "var(--shadow-card)",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.borderColor =
          "color-mix(in srgb,var(--accent-color) 30%,var(--border))";

        event.currentTarget.style.boxShadow =
          "var(--shadow-hover)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.borderColor =
          "var(--border)";

        event.currentTarget.style.boxShadow =
          "var(--shadow-card)";
      }}
    >
      {/* Accent glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          blur-3xl
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-20
        "
        style={{
          background:
            "var(--accent-color)",
        }}
      />

      <div
        className="
          relative
          z-10
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
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
              group-hover:scale-105
            "
            style={{
              background:
                "color-mix(in srgb,var(--accent-color) 10%,transparent)",

              borderColor:
                "color-mix(in srgb,var(--accent-color) 20%,var(--border))",

              color:
                "var(--accent-color)",
            }}
          >
            <FileText
              size={28}
              strokeWidth={1.8}
            />
          </div>

          <StatusBadge
            status={
              document.status
            }
          />
        </div>

        {/* Title */}

        <h3
          className="
            mt-6
            line-clamp-1
            text-xl
            font-semibold
            tracking-tight
          "
          style={{
            color:
              "var(--text)",
          }}
          title={
            document.title
          }
        >
          {document.title}
        </h3>

        {/* Metadata */}

        <p
          className="
            mt-2
            text-sm
          "
          style={{
            color:
              "var(--muted)",
          }}
        >
          
          {document.size}
        </p>

        {/* CTA */}

        <div className="mt-8">
          <Link
            to={`/dashboard/chat/${document.id}`}
            className="
              group/cta
              relative
              flex
              w-full
              items-center
              justify-center
              gap-2
              overflow-hidden
              rounded-2xl
              px-5
              py-3.5
              font-semibold
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
              active:translate-y-0
            "
            style={{
              background:
                "var(--accent-color)",

              color:
                "#ffffff",

              boxShadow:
                "0 10px 28px color-mix(in srgb,var(--accent-color) 22%,transparent)",
            }}
          >
            {/* Shine */}

            <span
              className="
                pointer-events-none
                absolute
                inset-0
                -translate-x-full
                bg-gradient-to-r
                from-transparent
                via-white/20
                to-transparent
                transition-transform
                duration-700
                group-hover/cta:translate-x-full
              "
            />

            <BrainCircuit
              size={18}
              className="
                relative
                z-10
                transition-transform
                duration-300
                group-hover/cta:scale-110
              "
            />

            <span
              className="
                relative
                z-10
              "
            >
              Start AI Chat
            </span>

            <ArrowRight
              size={18}
              className="
                relative
                z-10
                transition-transform
                duration-300
                group-hover/cta:translate-x-1
              "
            />
          </Link>
        </div>
      </div>
    </div>
  );
}