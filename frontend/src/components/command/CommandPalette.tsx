import {
  BrainCircuit,
  Command,
  FileText,
  LayoutDashboard,
  NotebookPen,
  Search,
  Sparkles,
  X,
} from "lucide-react";


import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";



interface CommandPaletteProps {

  onClose?: () => void;

}



const actions = [

  {
    title: "Open Dashboard",

    description:
      "Go to your workspace",

    icon:
      LayoutDashboard,

    path:
      "/dashboard",

  },


  {
    title: "Search Documents",

    description:
      "Find PDFs and notes",

    icon:
      FileText,

    path:
      "/dashboard/documents",

  },


  {
    title: "Ask AI Tutor",

    description:
      "Start a new conversation",

    icon:
      BrainCircuit,

    path:
      "/dashboard/chat",

  },


  {
    title: "Open Notes",

    description:
      "View your study notes",

    icon:
      NotebookPen,

    path:
      "/dashboard/notes",

  },

];





export default function CommandPalette({

  onClose,

}: CommandPaletteProps) {



  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filteredActions = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return actions;
    }

    return actions.filter((action) =>
      `${action.title} ${action.description}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);




  function handleAction(path:string){

    navigate(path);

    onClose?.();

  }





  return (


    <div

      className="
        w-full
        max-w-3xl
        overflow-hidden
        rounded-[32px]
        border
        shadow-2xl
        backdrop-blur-xl
      "

      style={{

        background:
          "var(--surface)",

        borderColor:
          "var(--border)",

      }}

    >




      {/* Search Header */}


      <div

        className="
          flex
          items-center
          gap-4
          border-b
          px-6
          py-5
        "

        style={{

          borderColor:
            "var(--border)",

        }}

      >


        <Search

          size={22}

          style={{

            color:
              "var(--muted)",

          }}

        />




        <input

          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoFocus
          placeholder="Search StudyCopilot..."

          className="
            flex-1
            bg-transparent
            text-lg
            outline-none
          "

          style={{

            color:
              "var(--text)",

          }}

        />





        <button
          type="button"

          onClick={onClose}

          className="
            rounded-lg
            p-2
            transition
            hover:bg-[var(--surfaceHover)]
          "

        >

          <X

            size={18}

            style={{

              color:
                "var(--muted)",

            }}

          />

        </button>





        <div

          className="
            flex
            items-center
            gap-1
            rounded-xl
            border
            px-3
            py-2
            text-xs
          "

          style={{

            borderColor:
              "var(--border)",

            color:
              "var(--muted)",

          }}

        >

          <Command size={14}/>

          K


        </div>




      </div>








      <div className="p-5">



        <p

          className="
            mb-4
            text-xs
            font-semibold
            uppercase
            tracking-[0.25em]
          "

          style={{

            color:
              "var(--muted)",

          }}

        >

          Suggested Actions


        </p>







        <div className="space-y-2">



          {filteredActions.map((item)=>{


            const Icon =
              item.icon;



            return (


              <button
                type="button"

                key={item.title}

                onClick={()=>
                  handleAction(
                    item.path,
                  )
                }


                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-4
                  rounded-2xl
                  p-4
                  text-left
                  transition-all
                  duration-300
                  hover:bg-[var(--surfaceHover)]
                "

              >



                <div

                  className="
                    rounded-2xl
                    p-3
                  "

                  style={{

                    background:
                    "color-mix(in srgb,var(--accent-color) 12%,transparent)",

                  }}

                >


                  <Icon

                    size={20}

                    style={{

                      color:
                        "var(--accent-color)",

                    }}

                  />


                </div>





                <div className="flex-1">


                  <h4

                    className="
                      font-medium
                    "

                    style={{

                      color:
                        "var(--text)",

                    }}

                  >

                    {item.title}


                  </h4>




                  <p

                    className="
                      mt-1
                      text-sm
                    "

                    style={{

                      color:
                        "var(--muted)",

                    }}

                  >

                    {item.description}


                  </p>



                </div>





                <Sparkles

                  size={18}

                  style={{

                    color:
                      "var(--muted)",

                  }}

                />



              </button>


            );

          })}



        </div>


      </div>



    </div>


  );

}