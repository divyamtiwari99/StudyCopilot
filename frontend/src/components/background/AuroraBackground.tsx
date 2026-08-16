import { motion } from "framer-motion";


interface Props {
  children: React.ReactNode;
}


export default function AuroraBackground({
  children,
}: Props) {


  return (

    <div

      className="
        relative
        min-h-screen
        overflow-hidden
      "

      style={{
        background:
          "var(--background)",
      }}

    >


      {/* Primary Aurora */}

      <motion.div

        animate={{

          x:[
            0,
            80,
            -60,
            0,
          ],

          y:[
            0,
            -80,
            60,
            0,
          ],

        }}

        transition={{

          duration:22,

          repeat:Infinity,

          ease:"linear",

        }}

        className="
          absolute
          -left-32
          -top-32
          h-[520px]
          w-[520px]
          rounded-full
          blur-[130px]
          opacity-20
        "

        style={{

          background:
            "var(--accent-color)",

        }}

      />





      {/* Secondary Glow */}


      <motion.div

        animate={{

          x:[
            0,
            -100,
            40,
            0,
          ],

          y:[
            0,
            80,
            -60,
            0,
          ],

        }}

        transition={{

          duration:26,

          repeat:Infinity,

          ease:"linear",

        }}

        className="
          absolute
          right-0
          top-0
          h-[420px]
          w-[420px]
          rounded-full
          blur-[140px]
          opacity-15
        "

        style={{

          background:
            "var(--accent-color)",

        }}

      />






      {/* Bottom Ambient Glow */}


      <motion.div

        animate={{

          scale:[
            1,
            1.15,
            1,
          ],

        }}

        transition={{

          duration:18,

          repeat:Infinity,

          ease:"easeInOut",

        }}

        className="
          absolute
          bottom-0
          left-1/2
          h-[520px]
          w-[520px]
          -translate-x-1/2
          rounded-full
          blur-[160px]
          opacity-10
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

        {children}

      </div>


    </div>

  );
}