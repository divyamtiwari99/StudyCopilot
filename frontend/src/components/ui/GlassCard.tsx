import { cn } from "../../lib/cn";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-[28px]",
        "border border-white/10",
        "bg-white/[0.04]",
        "shadow-2xl",
        "transition-all duration-300",
        "hover:border-[var(--accent-color)]",
        className,
      )}
    >
      {children}
    </div>
  );
}