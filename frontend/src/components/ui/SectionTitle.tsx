import { cn } from "@/lib/cn";


interface Props {

  title: string;

  subtitle?: string;

  className?: string;

}



export default function SectionTitle({

  title,

  subtitle,

  className,

}: Props) {


  return (

    <div


      className={cn(

        "mb-7",

        className,

      )}



    >



      <h2


        className="

          text-2xl

          font-bold

          tracking-tight

          lg:text-3xl

        "


        style={{


          color:

            "var(--text)",


        }}


      >


        {title}


      </h2>







      {subtitle && (


        <p


          className="

            mt-2

            max-w-2xl

            text-sm

            leading-6

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


  );

}