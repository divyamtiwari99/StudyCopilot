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


        "h-12",

        "w-full",


        "rounded-2xl",


        "border",


        "px-4",


        "text-sm",


        "outline-none",


        "transition-all",

        "duration-300",


        "backdrop-blur-xl",




        "disabled:cursor-not-allowed",

        "disabled:opacity-50",





        className,


      )}



      style={{


        background:

          "color-mix(in srgb,var(--surface),transparent 10%)",



        borderColor:

          "var(--border)",



        color:

          "var(--text)",



      }}



      {...props}



    />

  );

}