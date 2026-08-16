import {
  BrainCircuit,
  FileText,
  MessageSquare,
  NotebookPen,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Section from "../../../components/ui/Section";
import SectionHeading from "../../../components/ui/SectionHeading";



export default function WorkspacePreview() {

  return (

    <Section>


      <SectionHeading

        badge="Workspace"

        title="One Workspace."

        highlight="Focused Learning."

        description="Everything happens in one AI powered workspace."

      />





      <motion.div

        initial={{
          opacity:0,
          y:40,
        }}

        whileInView={{
          opacity:1,
          y:0,
        }}

        viewport={{
          once:true,
        }}

        transition={{
          duration:0.7,
        }}

        className="
          mt-20
          rounded-[36px]
          border
          border-[var(--border)]
          bg-[color-mix(in_srgb,var(--surface)_70%,transparent)]
          p-8
          backdrop-blur-xl
          shadow-2xl
        "

      >





        {/* Header */}


        <div

          className="
            mb-8
            flex
            items-center
            justify-between
          "

        >


          <div

            className="
              flex
              items-center
              gap-3
            "

          >


            <div

              className="
                rounded-2xl
                bg-[color-mix(in_srgb,var(--accent-color)_10%,transparent)]
                p-3
              "

            >

              <FileText

                className="
                  h-6
                  w-6
                  text-[var(--accent-color)]
                "

              />

            </div>




            <div>


              <h3

                className="
                  font-semibold
                  text-[var(--text)]
                "

              >

                Operating-System.pdf


              </h3>



              <p

                className="
                  text-sm
                  text-[var(--muted)]
                "

              >

                Ready for AI


              </p>



            </div>



          </div>






          <div

            className="
              rounded-full
              border
              border-[color-mix(in_srgb,var(--success)_20%,var(--border))]
              bg-[color-mix(in_srgb,var(--success)_10%,transparent)]
              px-4
              py-2
              text-sm
              text-[var(--success)]
            "

          >

            AI Ready


          </div>



        </div>







        {/* Chat */}



        <div

          className="
            space-y-5
          "

        >



          <motion.div

            initial={{
              opacity:0,
              x:30,
            }}

            whileInView={{
              opacity:1,
              x:0,
            }}

            viewport={{
              once:true,
            }}

            className="
              ml-auto
              max-w-md
              rounded-3xl
              bg-[var(--accent-color)]
              px-5
              py-4
              text-white
              shadow-lg
              shadow-[0_10px_28px_color-mix(in_srgb,var(--accent-color)_22%,transparent)]
            "

          >

            Explain Virtual Memory.


          </motion.div>







          <motion.div

            initial={{
              opacity:0,
              x:-30,
            }}

            whileInView={{
              opacity:1,
              x:0,
            }}

            viewport={{
              once:true,
            }}

            className="
              max-w-xl
              rounded-3xl
              border
              border-[var(--border)]
              bg-[var(--surface-solid)]
              p-5
            "

          >


            <div

              className="
                mb-4
                flex
                items-center
                gap-2
              "

            >

              <BrainCircuit

                className="
                  h-5
                  w-5
                  text-[var(--accent-color)]
                "

              />


              <span

                className="
                  font-medium
                  text-[var(--text)]
                "

              >

                StudyCopilot AI


              </span>


            </div>





            <p

              className="
                leading-8
                text-[var(--text-secondary)]
              "

            >

              Virtual memory allows the operating
              system to efficiently manage RAM by
              using disk storage as an extension of
              physical memory.


            </p>



          </motion.div>



        </div>









        {/* Actions */}



        <div

          className="
            mt-10
            grid
            gap-5
            md:grid-cols-3
          "

        >



          {[
            {
              icon: NotebookPen,
              title:"Generate Notes",
            },

            {
              icon: Sparkles,
              title:"Generate Quiz",
            },

            {
              icon: MessageSquare,
              title:"Flashcards",
            },

          ].map((item)=>{


            const Icon =
              item.icon;



            return (

              <Link

                key={item.title}

                to="/register"

                className="
                  group
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  border
                  border-[var(--border)]
                  bg-[color-mix(in_srgb,var(--surface)_70%,transparent)]
                  p-5
                  text-[var(--text)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[color-mix(in_srgb,var(--accent-color)_50%,var(--border))]
                  hover:bg-[color-mix(in_srgb,var(--surface)_85%,transparent)]
                "

              >

                <Icon

                  className="
                    h-5
                    w-5
                    text-[var(--accent-color)]
                  "

                />


                {item.title}


              </Link>


            );


          })}



        </div>





      </motion.div>



    </Section>

  );

}