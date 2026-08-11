import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  FileText,
  Layers3,
  NotebookPen,
  Sparkles,
} from "lucide-react";


const actions = [
  {
    title: "Ask AI",
    subtitle: "Start a new AI conversation",
    icon: BrainCircuit,
    path: "/dashboard/chat",
  },
  {
    title: "Upload Document",
    subtitle: "Add new study material",
    icon: FileText,
    path: "/dashboard/documents",
  },
  {
    title: "Generate Notes",
    subtitle: "Create structured notes",
    icon: NotebookPen,
    path: "/dashboard/notes",
  },
  {
    title: "Create Quiz",
    subtitle: "Test your knowledge",
    icon: BookOpen,
    path: "/dashboard/quiz",
  },
  {
    title: "Flashcards",
    subtitle: "Quick revision cards",
    icon: Layers3,
    path: "/dashboard/flashcards",
  },
];


export default function AICommandCenter() {

  const navigate = useNavigate();


  return (
    <section
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        p-6
        backdrop-blur-3xl
      "
    >


      <div className="mb-6">


        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            px-4
            py-2
            text-sm
            font-medium
          "
          style={{
            color:
              "var(--accent-color)",

            backgroundColor:
              "color-mix(in srgb,var(--accent-color) 10%,transparent)",

            border:
              "1px solid color-mix(in srgb,var(--accent-color) 20%,transparent)",
          }}
        >

          <Sparkles size={15} />

          Quick Actions

        </div>



        <h2
          className="
            mt-5
            text-2xl
            font-bold
            text-white
            lg:text-3xl
          "
        >
          What would you like to do?
        </h2>



        <p
          className="
            mt-2
            text-slate-400
          "
        >
          Jump directly into your next learning task.
        </p>


      </div>



      <div
        className="
          grid
          gap-4
          md:grid-cols-2
          xl:grid-cols-3
        "
      >

        {actions.map((action) => {

          const Icon = action.icon;


          return (

            <button

              key={action.title}

              onClick={() =>
                navigate(action.path)
              }

              className="
                group
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-5
                text-left
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white/[0.06]
              "

              style={{
                borderColor:
                  undefined,
              }}

            >


              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >


                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/10
                    transition
                    duration-300
                    group-hover:scale-105
                  "
                  style={{
                    backgroundColor:
                      "color-mix(in srgb,var(--accent-color) 10%,transparent)",
                  }}
                >

                  <Icon

                    size={22}

                    style={{
                      color:
                        "var(--accent-color)",
                    }}

                  />

                </div>



                <ArrowRight

                  size={18}

                  className="
                    text-slate-500
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    group-hover:text-white
                  "

                />


              </div>




              <h3
                className="
                  mt-5
                  text-base
                  font-semibold
                  text-white
                "
              >
                {action.title}
              </h3>



              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-slate-400
                "
              >
                {action.subtitle}
              </p>


            </button>

          );

        })}


      </div>


    </section>
  );
}