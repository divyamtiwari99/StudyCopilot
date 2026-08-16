import {
  ChevronDown,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import Section from "../../../components/ui/Section";

import SectionHeading from "../../../components/ui/SectionHeading";



const faqs = [

  {
    question: "Is StudyCopilot free for students?",
    answer:
      "You can create an account and use the current StudyCopilot workspace. Subscription checkout is not connected in the current product API, so the landing page does not show fabricated billing states.",
  },

  {
    question: "Which study files can I upload?",
    answer:
      "You can upload PDFs, DOCX, PPTX and TXT files and use AI to understand, summarize and revise your content.",
  },

  {
    question: "Can StudyCopilot create notes and quizzes?",
    answer:
      "Yes. StudyCopilot can generate smart notes, quizzes and flashcards from your uploaded study material.",
  },

  {
    question: "Is my study material secure?",
    answer:
      "The current product uses authenticated account access for workspace data. More security controls can be added when the corresponding backend security APIs are exposed.",
  },

  {
    question: "Can I use it for different subjects?",
    answer:
      "Yes. The current workflow works from the study material you upload, so you can use it across subjects as long as the relevant material is available to the workspace.",
  },

];



export default function Faq() {


  const [
    openIndex,
    setOpenIndex,
  ] = useState<number | null>(0);




  return (

    <Section id="faq">


      <SectionHeading

        badge="FAQ"

        title="Frequently Asked"

        highlight="Questions"

        description="Everything you need to know about StudyCopilot."

      />





      <div

        className="
          mx-auto
          mt-16
          max-w-4xl
          space-y-5
        "

      >



        {faqs.map((faq,index)=>{


          const isOpen =
            openIndex === index;



          return (


            <motion.div

              key={faq.question}

              initial={{
                opacity:0,
                y:20,
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
                overflow-hidden
                rounded-3xl
                border
                border-[var(--border)]
                bg-[color-mix(in_srgb,var(--surface)_70%,transparent)]
                backdrop-blur-xl
              "

            >



              <button

                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                onClick={()=>{

                  setOpenIndex(
                    isOpen
                    ? null
                    : index
                  );

                }}

                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  p-6
                  text-left
                "

              >



                <h3

                  className="
                    text-lg
                    font-semibold
                    text-[var(--text)]
                  "

                >

                  {faq.question}


                </h3>




                <ChevronDown

                  className={`

                    text-[var(--muted)]
                    transition-transform
                    duration-300

                    ${
                      isOpen
                      ? "rotate-180"
                      : ""
                    }

                  `}

                />


              </button>







              {isOpen && (

                <div
                  id={`faq-panel-${index}`}

                  className="
                    border-t
                    border-[var(--border)]
                    px-6
                    pb-6
                    pt-4
                  "

                >

                  <p

                    className="
                      leading-7
                      text-[var(--muted)]
                    "

                  >

                    {faq.answer}


                  </p>


                </div>

              )}




            </motion.div>


          );


        })}



      </div>



    </Section>

  );

}