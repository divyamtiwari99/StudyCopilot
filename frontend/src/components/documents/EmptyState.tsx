import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";


export default function EmptyState() {

  return (

    <motion.div
      initial={{
        opacity:0,
      }}
      animate={{
        opacity:1,
      }}
      className="
        flex
        h-[420px]
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-dashed
        border-white/10
        bg-white/[0.03]
        text-center
      "
    >

      <div
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
        "
        style={{
          backgroundColor:
            "color-mix(in srgb,var(--accent-color) 10%,transparent)",
          color:
            "var(--accent-color)",
        }}
      >

        <UploadCloud size={30}/>

      </div>



      <h2
        className="
          mt-6
          text-2xl
          font-semibold
          text-white
        "
      >
        No documents yet
      </h2>



      <p
        className="
          mt-3
          max-w-md
          text-white/50
        "
      >
        Upload your first PDF and start chatting with AI,
        generate notes, quizzes and flashcards instantly.
      </p>



      <button
        className="
          mt-8
          rounded-2xl
          px-6
          py-3
          font-medium
          text-black
          transition
          hover:scale-105
        "
        style={{
          backgroundColor:
            "var(--accent-color)",
        }}
      >
        Upload PDF
      </button>


    </motion.div>

  );
}