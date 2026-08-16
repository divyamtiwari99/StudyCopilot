import * as React from "react";

import { cn } from "@/lib/cn";



type Props =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;





export function Textarea({

  className,

  ...props

}: Props) {


  return (


    <textarea


      className={cn(


        "min-h-[120px]",

        "w-full",


        "resize-y",



        "rounded-2xl",



        "border",

        "border-[var(--border)]",



        "bg-[var(--surface)]",



        "p-4",



        "text-sm",

        "leading-6",

        "text-[var(--text)]",



        "placeholder:text-[var(--muted)]",



        "outline-none",



        "transition-all",

        "duration-300",



        "backdrop-blur-xl",



        "focus:border-[var(--accent-color)]",



        "focus:ring-4",

        "focus:ring-[color-mix(in_srgb,var(--accent-color)_12%,transparent)]",



        "disabled:cursor-not-allowed",

        "disabled:opacity-60",



        className,


      )}



      {...props}


    />


  );

}