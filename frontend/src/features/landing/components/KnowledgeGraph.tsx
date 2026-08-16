import {
  BrainCircuit,
  Database,
  GitBranch,
  Network,
} from "lucide-react";

import { motion } from "framer-motion";

import Section from "../../../components/ui/Section";
import SectionHeading from "../../../components/ui/SectionHeading";


const nodes = [
  {
    title: "Operating System",
    icon: BrainCircuit,
    position: "top-6 left-1/2 -translate-x-1/2",
  },

  {
    title: "Processes",
    icon: GitBranch,
    position: "top-44 left-8",
  },

  {
    title: "Memory",
    icon: Database,
    position: "top-44 right-8",
  },

  {
    title: "Virtual Memory",
    icon: Network,
    position: "bottom-8 left-1/2 -translate-x-1/2",
  },
];



export default function KnowledgeGraph() {

  return (

    <Section>


      <SectionHeading

        badge="AI Knowledge Graph"

        title="AI Connects"

        highlight="Everything"

        description="StudyCopilot understands relationships instead of isolated pages."

      />





      <div

        className="
          relative
          mt-20
          h-[520px]
          overflow-hidden
          rounded-[36px]
          border
          border-[var(--border)]
          bg-[color-mix(in_srgb,var(--surface)_70%,transparent)]
          backdrop-blur-xl
        "

      >





        {/* Connection Lines */}


        <svg

          className="
            absolute
            inset-0
            h-full
            w-full
          "

        >

          {[
            ["50%","12%","18%","46%"],
            ["50%","12%","82%","46%"],
            ["18%","46%","50%","88%"],
            ["82%","46%","50%","88%"],
          ].map((line,index)=>(


            <motion.line

              key={index}

              x1={line[0]}
              y1={line[1]}
              x2={line[2]}
              y2={line[3]}

              stroke="#8b5cf6"

              strokeOpacity="0.45"

              initial={{
                pathLength:0,
              }}

              animate={{
                pathLength:1,
              }}

              transition={{
                duration:1.5,
                delay:index*0.2,
              }}

            />


          ))}



        </svg>








        {nodes.map((node,index)=>{


          const Icon =
            node.icon;



          return (

            <motion.div

              key={node.title}

              initial={{
                opacity:0,
                scale:0.8,
              }}

              whileInView={{
                opacity:1,
                scale:1,
              }}

              viewport={{
                once:true,
              }}

              transition={{
                delay:index*0.15,
              }}

              className={`absolute ${node.position}`}

            >



              <div

                className="
                  flex
                  w-52
                  flex-col
                  items-center
                  rounded-3xl
                  border
                  border-[color-mix(in_srgb,var(--accent-color)_20%,var(--border))]
                  bg-[var(--surface-solid)]
                  p-5
                  shadow-xl
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-[color-mix(in_srgb,var(--accent-color)_40%,var(--border))]
                "

              >



                <div

                  className="
                    mb-4
                    rounded-2xl
                    bg-[color-mix(in_srgb,var(--accent-color)_20%,transparent)]
                    p-3
                  "

                >

                  <Icon

                    className="
                      h-6
                      w-6
                      text-[var(--accent-color)]
                    "

                  />

                </div>





                <h3

                  className="
                    font-semibold
                    text-[var(--text)]
                  "

                >

                  {node.title}

                </h3>



              </div>



            </motion.div>


          );


        })}




      </div>



    </Section>

  );

}