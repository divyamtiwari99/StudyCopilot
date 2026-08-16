import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  className?: string;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "group",
        "relative",
        "overflow-hidden",
        "rounded-[28px]",
        "border",
        "p-6",
        "transition-all",
        "duration-300",
        "hover:-translate-y-1",
        className,
      )}
      style={{
        background:
          "color-mix(in srgb,var(--surface) 96%,transparent)",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Ambient accent glow */}
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
          transition-all
          duration-500
          group-hover:opacity-20
        "
        style={{
          background: "var(--accent-color)",
        }}
      />

      {/* Bottom accent line */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-6
          right-6
          h-px
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
        style={{
          background:
            "linear-gradient(90deg,transparent,var(--accent-color),transparent)",
        }}
      />

      <div
        className="
          relative
          z-10
          flex
          items-start
          justify-between
          gap-5
        "
      >
        <div className="min-w-0">
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.14em]
            "
            style={{
              color: "var(--muted)",
            }}
          >
            {title}
          </p>

          <h3
            className="
              mt-3
              truncate
              text-4xl
              font-black
              tracking-tight
            "
            style={{
              color: "var(--text)",
            }}
          >
            {value}
          </h3>

          <p
            className="
              mt-2
              text-sm
            "
            style={{
              color: "var(--muted)",
            }}
          >
            {subtitle}
          </p>
        </div>

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
            group-hover:scale-110
            group-hover:-rotate-2
          "
          style={{
            background:
              "color-mix(in srgb,var(--accent-color) 10%,transparent)",
            borderColor:
              "color-mix(in srgb,var(--accent-color) 20%,transparent)",
            boxShadow:
              "inset 0 0 20px color-mix(in srgb,var(--accent-color) 5%,transparent)",
          }}
        >
          <Icon
            size={24}
            strokeWidth={2}
            style={{
              color: "var(--accent-color)",
            }}
          />
        </div>
      </div>
    </div>
  );
}