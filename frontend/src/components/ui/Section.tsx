import type {
  ReactNode,
} from "react";

import Container from "./Container";

import { cn } from "@/lib/cn";



interface SectionProps {

  children: ReactNode;

  className?: string;

  id?: string;

  size?: "default" | "wide" | "full";

  spacing?: "sm" | "default" | "lg";

}




const spacingMap = {


  sm:

    "py-10 md:py-14",



  default:

    "py-16 md:py-24",



  lg:

    "py-24 md:py-32",


};






export default function Section({

  children,

  className,

  id,

  size = "default",

  spacing = "default",

}: SectionProps) {



  return (



    <section


      id={id}


      className={cn(


        "relative",

        "w-full",

        spacingMap[spacing],

        className,


      )}


    >



      <Container

        size={size}

      >


        {children}


      </Container>



    </section>


  );

}