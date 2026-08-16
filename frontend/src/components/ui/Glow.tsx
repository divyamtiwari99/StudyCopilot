import { cn } from "@/lib/cn";


interface GlowProps {

  className?: string;

  intensity?: "soft" | "medium" | "strong";

  animated?: boolean;

}




export default function Glow({

  className,

  intensity = "medium",

  animated = false,

}: GlowProps) {



  const intensityMap = {


    soft:

      "opacity-[0.08] blur-[80px]",



    medium:

      "opacity-[0.12] blur-[120px]",



    strong:

      "opacity-[0.18] blur-[160px]",


  };






  return (



    <div



      className={cn(


        "pointer-events-none",

        "absolute",

        "rounded-full",

        "bg-[var(--accent-color)]",

        intensityMap[intensity],



        animated && [

          "animate-pulse",

          "duration-[6000ms]",

        ],



        className,



      )}



      style={{


        transform:

          "translateZ(0)",



      }}



    />



  );

}