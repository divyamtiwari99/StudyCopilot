import type { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
}

export default function GradientText({
  children,
}: GradientTextProps) {
  return (
    <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
      {children}
    </span>
  );
}