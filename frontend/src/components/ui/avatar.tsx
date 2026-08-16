import type {
  ReactNode,
} from "react";

import { cn } from "@/lib/cn";



interface AvatarProps {

  children?: ReactNode;

  src?: string;

  alt?: string;

  size?: "sm" | "md" | "lg";

  className?: string;

}




const sizeMap = {


  sm:

    "h-8 w-8 text-xs",



  md:

    "h-11 w-11 text-sm",



  lg:

    "h-16 w-16 text-xl",


};






export default function Avatar({

  children,

  src,

  alt = "Avatar",

  size = "md",

  className,

}: AvatarProps) {


  return (


    <div


      className={cn(


        "group",

        "relative",

        "flex",

        "items-center",

        "justify-center",

        "overflow-hidden",

        "rounded-full",

        "border",

        "font-semibold",

        "transition-all",

        "duration-300",

        "hover:scale-105",

        sizeMap[size],

        className,


      )}



      style={{



        background:

          "color-mix(in srgb,var(--accent-color) 8%,var(--surface))",



        borderColor:

          "var(--border)",



        color:

          "var(--text)",



      }}



    >




      {src ? (


        <img


          src={src}


          alt={alt}


          className="

            h-full

            w-full

            object-cover

          "


        />


      ) : (



        <span


          className="

            relative

            z-10

          "


        >


          {children}


        </span>



      )}





      <span


        className="

          pointer-events-none

          absolute

          inset-0

          rounded-full

          opacity-0

          transition-opacity

          duration-300

          group-hover:opacity-100

        "



        style={{



          boxShadow:

            "inset 0 0 0 1px var(--accent-color)",



        }}



      />





    </div>


  );

}