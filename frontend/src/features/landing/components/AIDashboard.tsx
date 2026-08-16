import {
  BrainCircuit,
  FileText,
  GraduationCap,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { motion } from "framer-motion";

import Section from "../../../components/ui/Section";
import SectionHeading from "../../../components/ui/SectionHeading";



export default function AIDashboard() {

  return (

    <Section>


      <SectionHeading

        badge="AI Workspace"

        title="Everything You Need"

        highlight="In One Dashboard"

        description="No switching between apps. Everything lives inside StudyCopilot."

      />





      <div

        className="
          mt-20
          grid
          gap-8
          lg:grid-cols-[1.2fr_0.8fr]
        "

      >




        {/* Main Panel */}


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
            rounded-[32px]
            border
            border-[var(--border)]
            bg-[color-mix(in_srgb,var(--surface)_70%,transparent)]
            p-8
            backdrop-blur-xl
            shadow-2xl
            transition
            hover:border-[color-mix(in_srgb,var(--accent-color)_30%,var(--border))]
          "

        >




          <div

            className="
              mb-8
              flex
              items-center
              justify-between
            "

          >

            <h3

              className="
                text-xl
                font-semibold
                text-[var(--text)]
              "

            >

              AI Workspace

            </h3>




            <span

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

              Online

            </span>


          </div>







          <div className="space-y-5">



            <div

              className="
                rounded-2xl
                bg-[var(--surface-solid)]
                p-5
                transition
                hover:translate-x-1
              "

            >

              <div className="flex items-center gap-3">


                <FileText

                  className="
                    h-5
                    w-5
                    text-[var(--accent-color)]
                  "

                />


                <span className="text-[var(--text)]">

                  DBMS.pdf uploaded

                </span>


              </div>


            </div>







            <div

              className="
                rounded-2xl
                bg-[color-mix(in_srgb,var(--accent-color)_15%,transparent)]
                p-5
                transition
                hover:translate-x-1
              "

            >

              <div className="flex items-center gap-3">


                <BrainCircuit

                  className="
                    h-5
                    w-5
                    text-[var(--accent-color)]
                  "

                />



                <span className="text-[var(--text)]">

                  AI generated summary in 3.2 sec

                </span>



              </div>


            </div>








            <div

              className="
                rounded-2xl
                bg-[var(--surface-solid)]
                p-5
                transition
                hover:translate-x-1
              "

            >

              <div className="flex items-center gap-3">


                <GraduationCap

                  className="
                    h-5
                    w-5
                    text-[var(--accent-color)]
                  "

                />


                <span className="text-[var(--text)]">

                  Quiz generated (20 Questions)

                </span>


              </div>


            </div>




          </div>



        </motion.div>








        {/* Side Cards */}



        <div className="space-y-8">



          {[
            {
              icon: Sparkles,
              title:"Smart Notes",
              description:
                "AI creates structured notes automatically.",
            },

            {
              icon: TrendingUp,
              title:"Progress",
              description:
                "Track learning with AI powered analytics.",
            },

          ].map((item)=>{


            const Icon =
              item.icon;



            return (


              <motion.div

                key={item.title}

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
                  rounded-[28px]
                  border
                  border-[var(--border)]
                  bg-[color-mix(in_srgb,var(--surface)_70%,transparent)]
                  p-6
                  backdrop-blur-xl
                  transition
                  hover:-translate-y-1
                  hover:border-[color-mix(in_srgb,var(--accent-color)_30%,var(--border))]
                "

              >


                <Icon

                  className="
                    mb-4
                    h-8
                    w-8
                    text-[var(--accent-color)]
                  "

                />



                <h3

                  className="
                    text-2xl
                    font-semibold
                    text-[var(--text)]
                  "

                >

                  {item.title}

                </h3>



                <p

                  className="
                    mt-3
                    text-[var(--muted)]
                  "

                >

                  {item.description}

                </p>



              </motion.div>


            );


          })}



        </div>




      </div>



    </Section>

  );

}