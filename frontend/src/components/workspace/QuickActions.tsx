import {
  Upload,
  FilePlus2,
  Sparkles,
} from "lucide-react";



const actions = [

  {
    title: "Upload PDF",
    icon: Upload,
  },

  {
    title: "New Note",
    icon: FilePlus2,
  },

  {
    title: "Ask AI",
    icon: Sparkles,
  },

];





export default function QuickActions() {


  return (


    <div


      className="
        flex
        flex-wrap
        gap-3
      "


    >



      {actions.map((action) => {



        const Icon = action.icon;




        return (



          <button



            key={action.title}



            className="
              group
              flex
              items-center
              gap-3
              rounded-2xl
              border
              px-4
              py-3
              text-sm
              font-semibold
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-1
            "



            style={{




              background:

                "color-mix(in srgb,var(--surface),transparent 8%)",




              borderColor:

                "var(--border)",




              color:

                "var(--text)",




              boxShadow:

                "var(--shadow-card)",



            }}



            onMouseEnter={(e) => {


              e.currentTarget.style.borderColor =

                "var(--accent-color)";



              e.currentTarget.style.boxShadow =

                "var(--shadow-hover)";



            }}




            onMouseLeave={(e) => {



              e.currentTarget.style.borderColor =

                "var(--border)";



              e.currentTarget.style.boxShadow =

                "var(--shadow-card)";



            }}



          >




            <span



              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-xl
                transition-transform
                duration-300
                group-hover:scale-110
              "



              style={{



                background:

                  "color-mix(in srgb,var(--accent-color) 12%,transparent)",



              }}



            >




              <Icon



                size={17}



                style={{



                  color:

                    "var(--accent-color)",



                }}



              />



            </span>







            {action.title}




          </button>



        );



      })}



    </div>



  );

}