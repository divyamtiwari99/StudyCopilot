import { Link } from "react-router-dom";
import { motion } from "framer-motion";


export default function Hero() {

  return (

    <section
      className="
        relative
        overflow-hidden
        bg-[var(--background)]
      "
    >


      {/* Main Glow */}

      <div

        className="
          absolute
          left-1/2
          top-0
          h-[700px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-[color-mix(in_srgb,var(--accent-color)_20%,transparent)]
          blur-[140px]
        "

      />



      <motion.div

        animate={{
          scale:[1,1.15,1],
          opacity:[0.4,0.7,0.4],
        }}

        transition={{
          duration:10,
          repeat:Infinity,
          ease:"easeInOut",
        }}

        className="
          absolute
          right-0
          top-40
          h-96
          w-96
          rounded-full
          bg-[color-mix(in_srgb,var(--info)_10%,transparent)]
          blur-[120px]
        "

      />




      <div

        className="
          relative
          mx-auto
          grid
          min-h-[calc(100vh-80px)]
          max-w-7xl
          items-center
          gap-16
          px-6
          py-20
          lg:grid-cols-2
        "

      >



        {/* LEFT */}


        <motion.div

          initial={{
            opacity:0,
            y:30,
          }}

          animate={{
            opacity:1,
            y:0,
          }}

          transition={{
            duration:0.7,
          }}

        >



          <span

            className="
              inline-flex
              rounded-full
              border
              border-[color-mix(in_srgb,var(--accent-color)_20%,var(--border))]
              bg-[color-mix(in_srgb,var(--accent-color)_10%,transparent)]
              px-4
              py-2
              text-sm
              font-medium
              text-[var(--accent-color)]
            "

          >

            🚀 AI Powered Learning

          </span>





          <h1

            className="
              mt-8
              text-5xl
              font-extrabold
              leading-tight
              text-[var(--text)]
              md:text-7xl
            "

          >

            Study Smarter

            <br />

            <span
              className="
                bg-gradient-to-r
                from-[var(--accent-color)]
                to-[var(--info)]
                bg-clip-text
                text-transparent
              "
            >
              Not Harder.
            </span>


          </h1>






          <p

            className="
              mt-6
              max-w-xl
              text-lg
              leading-8
              text-[var(--muted)]
            "

          >

            Upload your PDFs, chat with your documents,
            generate summaries, notes, quizzes and
            flashcards — all inside one beautiful AI workspace.

          </p>






          <div

            className="
              mt-10
              flex
              flex-wrap
              gap-4
            "

          >


            <Link

              to="/register"

              className="
                rounded-2xl
                bg-[var(--accent-color)]
                px-8
                py-4
                font-semibold
                text-white
                transition-all
                hover:-translate-y-1
                hover:bg-[var(--accent-color)]
                shadow-lg
                shadow-[0_10px_28px_color-mix(in_srgb,var(--accent-color)_22%,transparent)]
              "

            >

              Start Free

            </Link>





            <Link

              to="/login"

              className="
                rounded-2xl
                border
                border-[var(--border)]
                px-8
                py-4
                font-semibold
                text-[var(--text)]
                transition-all
                hover:bg-[color-mix(in_srgb,var(--surface)_85%,transparent)]
              "

            >

              Login

            </Link>


          </div>






          <div

            className="
              mt-12
              flex
              gap-10
            "

          >


            {[
              ["1","AI Workspace"],
              ["8+","Learning Tools"],
              ["AI","Study Assistant"],
            ].map(([value,label])=>(


              <div key={label}>


                <h2

                  className="
                    text-3xl
                    font-bold
                    text-[var(--text)]
                  "

                >

                  {value}

                </h2>


                <p

                  className="
                    text-[var(--muted)]
                  "

                >

                  {label}

                </p>


              </div>


            ))}


          </div>




        </motion.div>








        {/* RIGHT PRODUCT PREVIEW */}



        <motion.div

          initial={{
            opacity:0,
            scale:0.95,
          }}

          animate={{
            opacity:1,
            scale:1,
          }}

          transition={{
            duration:0.8,
          }}

          className="
            relative
          "

        >



          <div

            className="
              rounded-[32px]
              border
              border-[var(--border)]
              bg-[color-mix(in_srgb,var(--surface)_70%,transparent)]
              p-6
              backdrop-blur-xl
              shadow-2xl
            "

          >



            <div

              className="
                mb-6
                flex
                gap-2
              "

            >

              <div className="h-3 w-3 rounded-full bg-red-500"/>

              <div className="h-3 w-3 rounded-full bg-yellow-500"/>

              <div className="h-3 w-3 rounded-full bg-green-500"/>


            </div>






            <div className="space-y-4">



              <div

                className="
                  rounded-2xl
                  bg-[var(--surface-solid)]
                  p-4
                "

              >

                <p className="text-sm text-[var(--muted)]">
                  📄 Uploaded
                </p>


                <h3 className="mt-2 text-lg font-semibold text-[var(--text)]">
                  Operating Systems.pdf
                </h3>


              </div>






              <div

                className="
                  rounded-2xl
                  bg-[color-mix(in_srgb,var(--accent-color)_20%,transparent)]
                  p-4
                "

              >

                <p className="text-sm text-[var(--accent-color)]">
                  AI Summary
                </p>


                <p className="mt-2 text-[var(--text-secondary)]">

                  Memory management allows efficient allocation,
                  protection and organization of system resources...

                </p>


              </div>







              <div

                className="
                  rounded-2xl
                  bg-[var(--surface-solid)]
                  p-4
                "

              >

                <p className="text-sm text-[var(--muted)]">
                  Quiz Generated
                </p>


                <h3 className="mt-2 text-[var(--text)]">
                  15 Questions Ready
                </h3>


              </div>



            </div>




          </div>


        </motion.div>




      </div>


    </section>

  );

}