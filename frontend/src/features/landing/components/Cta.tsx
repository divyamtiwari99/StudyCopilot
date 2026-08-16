import { ArrowRight } from "lucide-react";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import Section from "../../../components/ui/Section";



export default function Cta() {

  return (

    <Section>


      <motion.div

        initial={{
          opacity:0,
          y:30,
        }}

        whileInView={{
          opacity:1,
          y:0,
        }}

        viewport={{
          once:true,
        }}

        className="
          relative
          overflow-hidden
          rounded-[40px]
          border
          border-[color-mix(in_srgb,var(--accent-color)_20%,var(--border))]
          bg-gradient-to-br
          from-[color-mix(in_srgb,var(--accent-color)_20%,transparent)]
          via-[color-mix(in_srgb,var(--accent-color)_10%,transparent)]
          to-[color-mix(in_srgb,var(--info)_10%,transparent)]
          p-10
          text-center
          md:p-16
        "

      >




        <div

          className="
            absolute
            left-1/2
            top-0
            h-72
            w-72
            -translate-x-1/2
            rounded-full
            bg-[color-mix(in_srgb,var(--accent-color)_20%,transparent)]
            blur-[100px]
          "

        />






        <div className="relative z-10">


          <h2

            className="
              text-4xl
              font-bold
              text-[var(--text)]
              md:text-5xl
            "

          >

            Ready to study smarter?

          </h2>






          <p

            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              text-[var(--text-secondary)]
            "

          >

            Bring your study material into one workspace to understand concepts,
            create revision material and prepare with AI.

          </p>







          <Link

            to="/register"

            className="
              mt-10
              inline-flex
              items-center
              gap-3
              rounded-2xl
              bg-[var(--accent-color)]
              px-8
              py-4
              font-semibold
              text-white
              shadow-lg
              shadow-[0_10px_28px_color-mix(in_srgb,var(--accent-color)_22%,transparent)]
              transition-all
              hover:-translate-y-1
              hover:bg-[var(--accent-color)]
            "

          >

            Get Started


            <ArrowRight size={20}/>


          </Link>




        </div>





      </motion.div>



    </Section>

  );

}