import type {
  ReactNode,
} from "react";

import { cn } from "../../lib/cn";



interface CardProps {

  children: ReactNode;

  className?: string;

  hover?: boolean;

  padding?: boolean;

}





export default function Card({

  children,

  className,

  hover = false,

  padding = false,

}: CardProps) {


  return (

    <div


      className={cn(

        "rounded-[28px]",

        "border",

        "backdrop-blur-xl",

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

          "var(--surface)",



        borderColor:

          "var(--border)",



        boxShadow:

          "var(--shadow-card)",



      }}



    >


      {children}



    </div>


  );

}