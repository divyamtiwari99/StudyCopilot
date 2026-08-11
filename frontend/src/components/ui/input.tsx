import * as React from "react";
import { cn } from "@/lib/cn";

type InputProps =
  React.InputHTMLAttributes<HTMLInputElement>;

export function Input({
  className,
  ...props
}: InputProps) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 outline-none transition-all",
        "focus:border-[var(--accent-color)] focus:bg-white/10",
        className,
      )}
      {...props}
    />
  );
}