import type {
  ReactNode,
} from "react";

import { cn } from "../../lib/cn";


interface GlassCardProps {

  children: ReactNode;

  className?: string;

  hover?: boolean;

  padding?: boolean;

}




export default function GlassCard({

  children,

  className,

  hover = true,

  padding = false,

}: GlassCardProps) {


  return (

    <div


      className={cn(

        "rounded-[28px]",

        "border",

        "backdrop-blur-2xl",

        "transition-all",

        "duration-300",


        hover && [

          "hover:-translate-y-1",

        ],


        padding && "p-6",


        className,


      )}



      style={{


        background:

          "color-mix(in srgb,var(--surface),transparent 20%)",



        borderColor:

          "var(--border)",



        boxShadow:

          "var(--shadow-soft)",



      }}



    >


      {children}


    </div>


  );

}