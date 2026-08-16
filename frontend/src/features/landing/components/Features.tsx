import {
  BrainCircuit,
  FileText,
  GraduationCap,
  Layers3,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

import { motion } from "framer-motion";

import Section from "../../../components/ui/Section";
import SectionHeading from "../../../components/ui/SectionHeading";


const features = [
  {
    title: "AI Document Chat",
    description:
      "Ask questions about an uploaded document and receive contextual answers from your study material.",
    icon: MessageSquare,
  },

  {
    title: "Smart Notes",
    description:
      "Generate structured notes with key concepts, summaries and highlights.",
    icon: FileText,
  },

  {
    title: "Adaptive Quiz",
    description:
      "Generate quizzes from the concepts and content in your uploaded study material.",
    icon: GraduationCap,
  },

  {
    title: "Flashcards",
    description:
      "Convert chapters into beautiful flashcards for quick revision.",
    icon: Layers3,
  },

  {
    title: "Study Planner",
    description:
      "Turn your learning material into a structured roadmap and study plan.",
    icon: TrendingUp,
  },

  {
    title: "Knowledge Graph",
    description:
      "Visualize how concepts connect across all your study materials.",
    icon: BrainCircuit,
  },
];



export default function Features() {

  return (

    <Section id="features">


      <SectionHeading

        badge="Features"

        title="Everything You Need To"

        highlight="Study Better"

        description="One workspace for reading, understanding, revising and mastering your subjects with AI."

      />






      <div

        className="
          mt-20
          grid
          gap-8
          md:grid-cols-2
          xl:grid-cols-3
        "

      >



        {features.map((feature,index)=>{


          const Icon =
            feature.icon;



          return (


            <motion.div

              key={feature.title}

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
                delay:index*0.08,
              }}

              className="
                group
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
                hover:bg-[color-mix(in_srgb,var(--surface)_86%,transparent)]
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
                  bg-[color-mix(in_srgb,var(--accent-color)_15%,transparent)]
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
                  text-2xl
                  font-semibold
                  text-[var(--text)]
                "

              >

                {feature.title}


              </h3>





              <p

                className="
                  mt-4
                  leading-7
                  text-[var(--muted)]
                "

              >

                {feature.description}


              </p>




            </motion.div>


          );


        })}



      </div>



    </Section>

  );

}