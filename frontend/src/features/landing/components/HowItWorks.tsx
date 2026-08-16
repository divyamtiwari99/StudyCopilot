import {
  ArrowRight,
  BrainCircuit,
  FileText,
  NotebookPen,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

import Section from "../../../components/ui/Section";
import SectionHeading from "../../../components/ui/SectionHeading";


const steps = [
  {
    icon: FileText,
    title: "Upload",
    description:
      "Drop PDFs, notes or study material into your workspace.",
  },

  {
    icon: BrainCircuit,
    title: "AI Understands",
    description:
      "StudyCopilot analyzes content and builds contextual knowledge.",
  },

  {
    icon: NotebookPen,
    title: "Learn",
    description:
      "Generate notes, summaries and explanations instantly.",
  },

  {
    icon: Sparkles,
    title: "Master",
    description:
      "Practice with quizzes and flashcards until you remember everything.",
  },
];



export default function HowItWorks() {

  return (

    <Section>


      <SectionHeading

        badge="Workflow"

        title="How StudyCopilot"

        highlight="Works"

        description="Four simple steps from document to mastery."

      />




      <div

        className="
          mt-20
          grid
          gap-8
          lg:grid-cols-4
        "

      >



        {steps.map((step,index)=>{


          const Icon =
            step.icon;



          return (


            <motion.div

              key={step.title}

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

              transition={{
                delay:index*0.12,
              }}


              className="
                relative
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
                hover:bg-[color-mix(in_srgb,var(--surface)_82%,transparent)]
              "

            >





              <div

                className="
                  mb-8
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[color-mix(in_srgb,var(--accent-color)_10%,transparent)]
                "

              >

                <Icon

                  className="
                    h-8
                    w-8
                    text-[var(--accent-color)]
                  "

                />


              </div>






              <div

                className="
                  mb-4
                  text-sm
                  font-medium
                  text-[var(--accent-color)]
                "

              >

                Step {index + 1}


              </div>






              <h3

                className="
                  text-2xl
                  font-semibold
                  text-[var(--text)]
                "

              >

                {step.title}


              </h3>






              <p

                className="
                  mt-4
                  leading-7
                  text-[var(--muted)]
                "

              >

                {step.description}


              </p>







              {index !== steps.length - 1 && (

                <ArrowRight

                  className="
                    absolute
                    -right-5
                    top-1/2
                    hidden
                    h-6
                    w-6
                    text-[var(--accent-color)]/50
                    lg:block
                  "

                />

              )}




            </motion.div>


          );


        })}



      </div>



    </Section>

  );

}