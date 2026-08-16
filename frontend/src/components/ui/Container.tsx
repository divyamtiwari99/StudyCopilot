import type {
  ReactNode,
} from "react";

import { cn } from "@/lib/cn";



interface ContainerProps {

  children: ReactNode;

  className?: string;

  size?: "default" | "wide" | "full";

}




const sizeMap = {

  default:
    "max-w-[1400px]",


  wide:
    "max-w-[1600px]",


  full:
    "max-w-full",

};






export default function Container({

  children,

  className,

  size = "default",

}: ContainerProps) {


  return (

    <div


      className={cn(

        "mx-auto",

        "w-full",

        "px-5",

        "sm:px-6",

        "lg:px-8",

        "2xl:px-10",

        sizeMap[size],

        className,

      )}


    >


      {children}


    </div>


  );

}