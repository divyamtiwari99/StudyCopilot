import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import {
  cva,
  type VariantProps,
} from "class-variance-authority";

import { cn } from "../../lib/cn";



const buttonVariants = cva(

  [
    "inline-flex",
    "items-center",
    "justify-center",
    "rounded-2xl",
    "font-semibold",
    "transition-all",
    "duration-300",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "active:scale-[0.97]",
    "relative",
    "overflow-hidden",
    "gap-2",
  ],


  {


    variants:{


      variant:{


        primary:[

          "text-white",

          "bg-[var(--accent-color)]",

          "shadow-[0_12px_35px_color-mix(in_srgb,var(--accent-color)_25%,transparent)]",

          "hover:brightness-105",

          "hover:-translate-y-0.5",

        ],





        secondary:[


          "border",

          "bg-[var(--surface)]",

          "text-[var(--text)]",

          "border-[var(--border)]",

          "hover:border-[var(--accent-color)]",

          "hover:bg-[var(--surfaceHover)]",

          "hover:-translate-y-0.5",

        ],





        ghost:[


          "text-[var(--muted)]",

          "hover:text-[var(--text)]",

          "hover:bg-[var(--surfaceHover)]",

        ],






        danger:[


          "bg-[var(--danger)]",

          "text-white",

          "shadow-[0_12px_30px_rgba(220,38,38,.18)]",

          "hover:brightness-110",

          "hover:-translate-y-0.5",

        ],


      },





      size:{


        sm:

        [

          "h-10",

          "px-4",

          "text-sm",

        ],




        md:

        [

          "h-12",

          "px-6",

          "text-sm",

        ],





        lg:

        [

          "h-14",

          "px-8",

          "text-base",

        ],





        icon:

        [

          "h-12",

          "w-12",

          "p-0",

        ],


      },


    },





    defaultVariants:{


      variant:

      "primary",



      size:

      "md",


    },


  },

);






interface ButtonProps

extends ButtonHTMLAttributes<HTMLButtonElement>,

VariantProps<typeof buttonVariants>{

  children:

  ReactNode;

}







export default function Button({

  className,

  variant,

  size,

  children,

  ...props

}:ButtonProps){



return(


<button


className={cn(

buttonVariants({

variant,

size,

}),

className,

)}



{...props}



>


{children}


</button>


);


}