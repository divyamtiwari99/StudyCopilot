import type { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className,
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300",
        "hover:border-[var(--accent-color)]",
        className,
      )}
    >
      {children}
    </div>
  );
}