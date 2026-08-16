import {
  BookOpen,
  BrainCircuit,
  FileText,
  Home,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";



const links = [

  {
    icon: Home,
    label: "Dashboard",
    to: "/dashboard",
  },

  {
    icon: FileText,
    label: "Documents",
    to: "/dashboard/documents",
  },

  {
    icon: BrainCircuit,
    label: "AI Chat",
    to: "/dashboard/chat",
  },

  {
    icon: BookOpen,
    label: "Notes",
    to: "/dashboard/notes",
  },

  {
    icon: Settings,
    label: "Settings",
    to: "/dashboard/settings",
  },

];





export default function Sidebar() {


  return (

    <aside


      className="
        fixed
        left-4
        top-4
        bottom-4
        z-40
        flex
        w-72
        flex-col
        overflow-hidden
        rounded-[32px]
        border
        backdrop-blur-xl
        transition-all
        duration-300
      "


      style={{


        background:

          "color-mix(in srgb,var(--surface),transparent 10%)",



        borderColor:

          "var(--border)",



        boxShadow:

          "var(--shadow-soft)",


      }}


    >





      {/* Logo */}



      <div


        className="
          border-b
          p-6
        "


        style={{

          borderColor:

            "var(--border)",

        }}


      >



        <div


          className="
            flex
            items-center
            gap-3
          "


        >



          <img


            src="/logo.png"


            alt="StudyCopilot Logo"


            className="
              h-12
              w-12
              rounded-2xl
              object-contain
            "


          />





          <div>



            <h1


              className="
                text-xl
                font-bold
                tracking-tight
              "


              style={{


                color:

                  "var(--text)",


              }}


            >

              StudyCopilot

            </h1>





            <p


              className="
                text-xs
              "


              style={{


                color:

                  "var(--muted)",


              }}


            >

              AI Learning Assistant

            </p>




          </div>




        </div>



      </div>









      {/* Navigation */}





      <nav


        className="
          flex-1
          space-y-2
          overflow-y-auto
          p-5
          scrollbar-hide
        "


      >




        {links.map(({icon: Icon,label,to}) => (




          <NavLink



            key={label}



            to={to}



            className={({isActive}) =>

              `

              group
              flex
              items-center
              gap-3
              rounded-2xl
              px-4
              py-3
              text-sm
              font-medium
              transition-all
              duration-300

              ${
                isActive

                ?

                "scale-[1.02]"

                :

                "hover:-translate-y-0.5"

              }

              `

            }



          >



            {({isActive}) => (


              <>


                <div


                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    transition-all
                    duration-300
                  "


                  style={{


                    backgroundColor:

                      isActive

                      ?

                      "color-mix(in srgb,var(--accent-color) 12%,transparent)"

                      :

                      "transparent",


                  }}


                >



                  <Icon


                    size={19}


                    style={{


                      color:

                        isActive

                        ?

                        "var(--accent-color)"

                        :

                        "var(--muted)",


                    }}


                  />



                </div>





                <span


                  style={{


                    color:

                      isActive

                      ?

                      "var(--text)"

                      :

                      "var(--muted)",


                  }}


                >


                  {label}



                </span>




              </>


            )}




          </NavLink>




        ))}




      </nav>









      {/* Bottom Study Mode */}





      <div


        className="
          border-t
          p-5
        "


        style={{


          borderColor:

            "var(--border)",


        }}



      >




        <div


          className="
            rounded-2xl
            border
            p-4
          "



          style={{



            background:

              "color-mix(in srgb,var(--accent-color) 8%,transparent)",



            borderColor:

              "color-mix(in srgb,var(--accent-color) 18%,transparent)",


          }}



        >




          <p


            className="
              text-xs
              font-semibold
            "


            style={{


              color:

                "var(--accent-color)",


            }}


          >

            Study Mode


          </p>





          <p


            className="
              mt-1
              text-sm
              font-semibold
            "


            style={{


              color:

                "var(--text)",


            }}


          >

            AI Learning Active


          </p>





        </div>





      </div>







    </aside>


  );


}