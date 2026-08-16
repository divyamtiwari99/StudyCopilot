import { cn } from "@/lib/cn";



interface ProgressProps {

  value: number;

  className?: string;

}




export function Progress({

  value,

  className,

}: ProgressProps) {



  const progressValue =

    Math.min(

      Math.max(value,0),

      100,

    );




  return (


    <div


      className={cn(


        "h-2.5",

        "w-full",

        "overflow-hidden",

        "rounded-full",

        className,


      )}



      style={{


        background:

          "color-mix(in srgb,var(--border) 60%,transparent)",


      }}



      role="progressbar"


      aria-valuemin={0}


      aria-valuemax={100}


      aria-valuenow={progressValue}



    >




      <div



        className="

          h-full

          rounded-full

          transition-all

          duration-700

          ease-out

        "



        style={{



          width:

            `${progressValue}%`,



          background:

            "var(--accent-color)",



          boxShadow:

            "0 4px 14px color-mix(in srgb,var(--accent-color) 30%,transparent)",



        }}



      />




    </div>


  );

}