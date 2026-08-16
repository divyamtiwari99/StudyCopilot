import { motion } from "framer-motion";

import { UploadCloud } from "lucide-react";


export default function EmptyState() {


  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 10,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.4,
      }}


      className="
        flex
        min-h-[360px]
        flex-col
        items-center
        justify-center
        rounded-[32px]
        border
        border-dashed
        text-center
        backdrop-blur-xl
      "


      style={{

        background:
          "var(--surface)",


        borderColor:
          "var(--border)",


        boxShadow:
          "0 20px 45px rgba(15,23,42,0.05)",

      }}

    >




      <div

        className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-3xl
        "

        style={{


          background:

            "color-mix(in srgb,var(--accent-color) 12%,transparent)",



          color:

            "var(--accent-color)",


        }}

      >

        <UploadCloud size={34}/>


      </div>







      <h2

        className="
          mt-7
          text-2xl
          font-bold
          tracking-tight
        "

        style={{


          color:

            "var(--text)",


        }}

      >

        No documents yet


      </h2>







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

        Upload your first PDF and start chatting with AI,
        generate notes, quizzes and flashcards instantly.


      </p>







      





    </motion.div>

  );

}