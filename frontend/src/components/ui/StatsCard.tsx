import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        p-5
        backdrop-blur-3xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[var(--accent-color)]
        hover:bg-white/[0.06]
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -right-10
          -top-10
          h-32
          w-32
          rounded-full
          blur-3xl
          transition
          duration-500
          opacity-20
          group-hover:opacity-40
        "
        style={{
          backgroundColor:
            "var(--accent-color)",
        }}
      />

      <div
        className="
          relative
          z-10
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <p
            className="
              text-sm
              font-medium
              text-slate-400
            "
          >
            {title}
          </p>

          <h3
            className="
              mt-2
              text-3xl
              font-black
              tracking-tight
              text-white
            "
          >
            {value}
          </h3>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            {subtitle}
          </p>
        </div>

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-white/10
            transition
            duration-300
            group-hover:scale-105
          "
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--accent-color) 10%, transparent)",
          }}
        >
          <Icon
            size={22}
            style={{
              color:
                "var(--accent-color)",
            }}
          />
        </div>
      </div>
    </div>
  );
}