import {
  BrainCircuit,
  FileText,
  GraduationCap,
  NotebookPen,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

import Section from "../../../components/ui/Section";
import SectionHeading from "../../../components/ui/SectionHeading";


const timeline = [
  {
    icon: FileText,
    title: "Upload Document",
    description:
      "Upload your PDFs, notes or study material.",
  },

  {
    icon: BrainCircuit,
    title: "AI Analysis",
    description:
      "StudyCopilot understands concepts and relationships.",
  },

  {
    icon: NotebookPen,
    title: "Smart Notes",
    description:
      "Generate structured notes with one click.",
  },

  {
    icon: GraduationCap,
    title: "Practice",
    description:
      "AI creates quizzes and flashcards automatically.",
  },

  {
    icon: Sparkles,
    title: "Master Topic",
    description:
      "Track progress and revise only weak concepts.",
  },
];



export default function LearningTimeline() {

  return (

    <Section>


      <SectionHeading

        badge="Learning Journey"

        title="From Upload"

        highlight="To Mastery"

        description="See how StudyCopilot transforms your study workflow."

      />





      <div

        className="
          relative
          mx-auto
          mt-20
          max-w-5xl
        "

      >



        {/* Timeline Line */}


        <div

          className="
            absolute
            left-8
            top-0
            h-full
            w-px
            bg-gradient-to-b
            from-[var(--accent-color)]
            via-[var(--info)]
            to-transparent
          "

        />







        <div className="space-y-10">


          {timeline.map((item,index)=>{


            const Icon =
              item.icon;



            return (

              <motion.div

                key={item.title}

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

                transition={{
                  delay:index*0.12,
                }}

                className="
                  relative
                  flex
                  gap-8
                "

              >




                {/* Step Icon */}


                <div

                  className="
                    relative
                    z-10
                    flex
                    h-16
                    w-16
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[var(--accent-color)]
                    text-white
                    shadow-lg
                    shadow-[0_10px_28px_color-mix(in_srgb,var(--accent-color)_22%,transparent)]
                  "

                >

                  <Icon className="h-7 w-7"/>

                </div>







                {/* Content Card */}


                <div

                  className="
                    flex-1
                    rounded-3xl
                    border
                    border-[var(--border)]
                    bg-[color-mix(in_srgb,var(--surface)_70%,transparent)]
                    p-6
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[color-mix(in_srgb,var(--accent-color)_40%,var(--border))]
                    hover:bg-[color-mix(in_srgb,var(--surface)_78%,transparent)]
                  "

                >


                  <h3

                    className="
                      text-xl
                      font-semibold
                      text-[var(--text)]
                    "

                  >

                    {item.title}


                  </h3>




                  <p

                    className="
                      mt-3
                      leading-7
                      text-[var(--muted)]
                    "

                  >

                    {item.description}


                  </p>



                </div>



              </motion.div>


            );


          })}



        </div>



      </div>



    </Section>

  );

}