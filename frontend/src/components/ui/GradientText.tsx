import type {
  ReactNode,
} from "react";

import { cn } from "@/lib/cn";



interface GradientTextProps {

  children: ReactNode;

  className?: string;

}



export default function GradientText({

  children,

  className,

}: GradientTextProps) {


  return (


    <span


      className={cn(

        "bg-gradient-to-r",

        "from-[var(--accent-color)]",

        "to-[var(--accent-color)]",

        "bg-clip-text",

        "text-transparent",

        "transition-all",

        "duration-300",

        className,


      )}



    >


      {children}



    </span>


  );

}