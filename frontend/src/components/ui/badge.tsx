import type {
  ReactNode,
} from "react";

import { cn } from "@/lib/cn";



interface BadgeProps {

  children: ReactNode;

  className?: string;

  variant?:
    | "accent"
    | "success"
    | "warning"
    | "danger"
    | "neutral";

}





export function Badge({

  children,

  className,

  variant = "accent",

}: BadgeProps) {



  const styles = {


    accent: {

      color:
        "var(--accent-color)",

      background:
        "color-mix(in srgb,var(--accent-color) 10%,transparent)",

      borderColor:
        "color-mix(in srgb,var(--accent-color) 25%,transparent)",

    },



    success: {

      color:
        "var(--success)",

      background:
        "color-mix(in srgb,var(--success) 10%,transparent)",

      borderColor:
        "color-mix(in srgb,var(--success) 25%,transparent)",

    },



    warning: {

      color:
        "var(--warning)",

      background:
        "color-mix(in srgb,var(--warning) 10%,transparent)",

      borderColor:
        "color-mix(in srgb,var(--warning) 25%,transparent)",

    },



    danger: {

      color:
        "var(--danger)",

      background:
        "color-mix(in srgb,var(--danger) 10%,transparent)",

      borderColor:
        "color-mix(in srgb,var(--danger) 25%,transparent)",

    },



    neutral: {

      color:
        "var(--muted)",

      background:
        "var(--surface)",

      borderColor:
        "var(--border)",

    },


  };





  return (


    <span


      className={cn(


        "inline-flex",

        "items-center",

        "rounded-full",

        "border",

        "px-3",

        "py-1",

        "text-xs",

        "font-semibold",

        "backdrop-blur-xl",

        "transition-all",

        "duration-300",

        className,


      )}



      style={

        styles[variant]

      }



    >


      {children}



    </span>


  );

}