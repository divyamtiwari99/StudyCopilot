import {
  UploadCloud,
} from "lucide-react";

import Button from "../ui/Button";

import { cn } from "@/lib/cn";



interface UploadCardProps {

  className?: string;

}





export default function UploadCard({

  className,

}: UploadCardProps) {



  return (



    <div



      className={cn(



        "group",

        "relative",

        "overflow-hidden",

        "rounded-[32px]",

        "border",

        "border-dashed",

        "p-10",

        "text-center",

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






      {/* Accent Glow */}



      <div



        className="

          pointer-events-none

          absolute

          left-1/2

          top-0

          h-48

          w-48

          -translate-x-1/2

          rounded-full

          opacity-0

          blur-3xl

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

        "

      >








        <div



          className="

            mx-auto

            flex

            h-20

            w-20

            items-center

            justify-center

            rounded-[26px]

            border

            transition-all

            duration-300

            group-hover:scale-105

          "



          style={{



            background:

              "color-mix(in srgb,var(--accent-color) 12%,transparent)",



            borderColor:

              "color-mix(in srgb,var(--accent-color) 20%,transparent)",



          }}



        >



          <UploadCloud



            size={36}



            style={{



              color:

                "var(--accent-color)",



            }}



          />



        </div>









        <h2



          className="

            mt-8

            text-2xl

            font-bold

            tracking-tight

          "



          style={{



            color:

              "var(--text)",



          }}



        >



          Upload PDF



        </h2>









        <p



          className="

            mx-auto

            mt-3

            max-w-sm

            text-sm

            leading-6

          "



          style={{



            color:

              "var(--muted)",



          }}



        >



          Drag & drop your study material

          or choose a PDF from your device.



        </p>









        <Button



          className="

            mt-7

          "



        >



          Choose PDF



        </Button>







      </div>





    </div>



  );

}