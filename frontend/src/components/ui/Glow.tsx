interface GlowProps {
  className?: string;
}

export default function Glow({
  className = "",
}: GlowProps) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full bg-violet-600/20 blur-[140px] ${className}`}
    />
  );
}