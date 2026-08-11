interface GlowProps {
  className?: string;
}

export default function Glow({
  className = "",
}: GlowProps) {
  return (
    <div
      className={`
        pointer-events-none
        absolute
        rounded-full
        blur-[140px]
        opacity-20
        ${className}
      `}
      style={{
        backgroundColor:
          "var(--accent-color)",
      }}
    />
  );
}