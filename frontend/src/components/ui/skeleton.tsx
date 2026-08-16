import { cn } from "@/lib/cn";



interface SkeletonProps {

  className?: string;

}





export default function Skeleton({

  className,

}: SkeletonProps) {


  return (


    <div


      className={cn(


        "relative",

        "overflow-hidden",

        "rounded-xl",

        "bg-[var(--surfaceHover)]",

        "transition-colors",

        "duration-300",

        className,


      )}



    >



      <div


        className="

          absolute

          inset-0

          -translate-x-full

          animate-[shimmer_1.8s_infinite]

          bg-gradient-to-r

          from-transparent

          via-white/30

          to-transparent

        "


      />



    </div>


  );

}