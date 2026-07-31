import * as React from "react";
import { cn } from "@/lib/cn";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: Props) {
  return (
    <textarea
      className={cn(
        "min-h-[120px] w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white placeholder:text-white/40 outline-none",
        "focus:border-cyan-400/50 focus:bg-white/10",
        className
      )}
      {...props}
    />
  );
}