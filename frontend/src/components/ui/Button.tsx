import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20",

        secondary:
          "border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]",

        ghost:
          "text-slate-300 hover:bg-white/5",

        danger:
          "bg-red-600 text-white hover:bg-red-500",
      },

      size: {
        sm: "h-10 px-4 text-sm",

        md: "h-12 px-6",

        lg: "h-14 px-8 text-lg",

        icon: "h-12 w-12",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export default function Button({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({
          variant,
          size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}