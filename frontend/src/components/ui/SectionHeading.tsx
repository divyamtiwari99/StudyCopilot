import GradientText from "./GradientText";

import { cn } from "@/lib/cn";



interface Props {

  badge?: string;

  title: string;

  highlight?: string;

  description?: string;

  className?: string;

}





export default function SectionHeading({

  badge,

  title,

  highlight,

  description,

  className,

}: Props) {


  return (


    <div


      className={cn(

        "mx-auto",

        "max-w-3xl",

        "text-center",

        className,

      )}



    >



      {badge && (


        <div


          className="

            inline-flex

            items-center

            rounded-full

            border

            px-4

            py-2

            text-sm

            font-semibold

            transition-all

            duration-300

          "



          style={{


            background:

              "color-mix(in srgb,var(--accent-color) 8%,transparent)",



            borderColor:

              "color-mix(in srgb,var(--accent-color) 20%,transparent)",



            color:

              "var(--accent-color)",


          }}



        >


          {badge}


        </div>


      )}







      <h2


        className="

          mt-6

          text-4xl

          font-bold

          tracking-tight

          md:text-5xl

        "



        style={{


          color:

            "var(--text)",


        }}



      >


        {title}


        {highlight && (

          <>

            {" "}

            <GradientText>

              {highlight}

            </GradientText>

          </>

        )}


      </h2>







      {description && (



        <p


          className="

            mx-auto

            mt-5

            max-w-2xl

            text-base

            leading-7

            md:text-lg

          "



          style={{


            color:

              "var(--muted)",


          }}



        >


          {description}


        </p>



      )}





    </div>


  );

}