import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-500",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}