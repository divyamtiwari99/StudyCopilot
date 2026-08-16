import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";



interface StatCardProps {

  title: string;

  value: string | number;

  subtitle?: string;

  icon?: LucideIcon;

  className?: string;

}





export default function StatCard({

  title,

  value,

  subtitle,

  icon: Icon,

  className,

}: StatCardProps) {



  return (



    <div



      className={cn(



        "group",

        "relative",

        "overflow-hidden",

        "rounded-[32px]",

        "border",

        "p-6",

        "backdrop-blur-xl",

        "transition-all",

        "duration-300",

        "hover:-translate-y-1",

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





      {/* Premium Accent Glow */}



      <div



        className="

          pointer-events-none

          absolute

          -right-12

          -top-12

          h-36

          w-36

          rounded-full

          blur-3xl

          opacity-0

          transition-all

          duration-500

          group-hover:opacity-25

        "



        style={{



          background:

            "var(--accent-color)",



        }}



      />








      <div

        className="

          relative

          z-10

          flex

          items-start

          justify-between

          gap-5

        "

      >




        <div>



          <p

            className="

              text-sm

              font-medium

            "

            style={{



              color:

                "var(--muted)",



            }}

          >



            {title}



          </p>






          <h2



            className="

              mt-3

              text-4xl

              font-black

              tracking-tight

            "



            style={{



              color:

                "var(--text)",



            }}



          >



            {value}



          </h2>







          {subtitle && (



            <p



              className="

                mt-2

                text-sm

              "



              style={{



                color:

                  "var(--muted)",



              }}



            >



              {subtitle}



            </p>



          )}



        </div>








        {Icon && (



          <div



            className="

              flex

              h-12

              w-12

              shrink-0

              items-center

              justify-center

              rounded-2xl

              border

              transition-all

              duration-300

              group-hover:scale-110

            "



            style={{



              background:

                "color-mix(in srgb,var(--accent-color) 10%,transparent)",



              borderColor:

                "color-mix(in srgb,var(--accent-color) 20%,transparent)",



            }}



          >



            <Icon



              size={22}



              style={{



                color:

                  "var(--accent-color)",



              }}



            />



          </div>



        )}





      </div>





    </div>



  );

}