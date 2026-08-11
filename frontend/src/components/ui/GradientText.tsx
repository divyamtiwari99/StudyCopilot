import type { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
}

export default function GradientText({
  children,
}: GradientTextProps) {
  return (
    <span
      className="
        bg-gradient-to-r
        from-[var(--accent-color)]
        to-white
        bg-clip-text
        text-transparent
      "
    >
      {children}
    </span>
  );
}