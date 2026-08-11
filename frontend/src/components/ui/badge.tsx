import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium",
        className,
      )}
      style={{
        color: "var(--accent-color)",
        borderColor:
          "color-mix(in srgb, var(--accent-color) 20%, transparent)",
        backgroundColor:
          "color-mix(in srgb, var(--accent-color) 10%, transparent)",
      }}
    >
      {children}
    </span>
  );
}