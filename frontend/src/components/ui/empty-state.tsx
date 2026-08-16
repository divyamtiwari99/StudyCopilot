import type { ReactNode } from "react";

import { cn } from "@/lib/cn";


interface EmptyStateProps {

  icon?: ReactNode;

  title: string;

  description?: string;

  action?: ReactNode;

  className?: string;

}



export default function EmptyState({

  icon,

  title,

  description,

  action,

  className,

}: EmptyStateProps) {


  return (


    <div


      className={cn(

        "group",

        "flex",

        "flex-col",

        "items-center",

        "justify-center",

        "rounded-[28px]",

        "border",

        "p-10",

        "text-center",

        "transition-all",

        "duration-300",

        "hover:-translate-y-0.5",

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





      {/* Icon */}


      {icon && (


        <div


          className="

            relative

            flex

            h-16

            w-16

            items-center

            justify-center

            rounded-3xl

            border

            transition-all

            duration-300

            group-hover:scale-105

          "


          style={{


            background:

              "color-mix(in srgb,var(--accent-color) 10%,transparent)",



            borderColor:

              "color-mix(in srgb,var(--accent-color) 20%,transparent)",



            color:

              "var(--accent-color)",


          }}


        >


          {icon}


        </div>


      )}







      <h3


        className="

          mt-6

          text-xl

          font-bold

          tracking-tight

        "


        style={{


          color:

            "var(--text)",


        }}


      >


        {title}


      </h3>








      {description && (


        <p


          className="

            mt-3

            max-w-md

            text-sm

            leading-6

          "


          style={{


            color:

              "var(--muted)",


          }}


        >


          {description}


        </p>


      )}








      {action && (


        <div className="mt-6">


          {action}


        </div>


      )}







    </div>


  );

}