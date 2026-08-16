import {
  BookOpen,
  BrainCircuit,
  FileText,
  Users,

} from "lucide-react";

import { motion } from "framer-motion";

import Section from "../../../components/ui/Section";


const stats = [
  {
    icon: FileText,
    value: "1",
    label: "Unified AI Workspace",
  },

  {
    icon: BrainCircuit,
    value: "8+",
    label: "Learning Tools",
  },

  {
    icon: BookOpen,
    value: "4+",
    label: "Study File Formats",
  },

  {
    icon: Users,
    value: "1",
    label: "Connected Study Flow",
  },

];



export default function Stats() {

  return (

    <Section>


      <div

        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "

      >



        {stats.map((stat,index)=>{


          const Icon =
            stat.icon;



          return (

            <motion.div

              key={stat.label}

              initial={{
                opacity:0,
                y:25,
              }}

              whileInView={{
                opacity:1,
                y:0,
              }}

              viewport={{
                once:true,
              }}

              transition={{
                delay:index*0.1,
              }}

              className="
                rounded-3xl
                border
                border-[var(--border)]
                bg-[color-mix(in_srgb,var(--surface)_70%,transparent)]
                p-8
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-[color-mix(in_srgb,var(--accent-color)_40%,var(--border))]
              "

            >



              <div

                className="
                  mb-6
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[color-mix(in_srgb,var(--accent-color)_10%,transparent)]
                "

              >

                <Icon

                  className="
                    h-7
                    w-7
                    text-[var(--accent-color)]
                  "

                />

              </div>





              <h3

                className="
                  text-4xl
                  font-bold
                  text-[var(--text)]
                "

              >

                {stat.value}


              </h3>




              <p

                className="
                  mt-3
                  text-[var(--muted)]
                "

              >

                {stat.label}


              </p>




            </motion.div>


          );


        })}



      </div>



    </Section>

  );

}