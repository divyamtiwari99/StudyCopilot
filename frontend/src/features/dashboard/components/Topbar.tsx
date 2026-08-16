import {
  Bell,
  Search,
} from "lucide-react";



export default function Topbar() {


  return (

    <header


      className="
        sticky
        top-4
        z-30
        mx-4
        flex
        h-20
        items-center
        justify-between
        rounded-[28px]
        border
        px-6
        backdrop-blur-xl
        transition-all
        duration-300
      "



      style={{


        background:

          "color-mix(in srgb,var(--surface),transparent 12%)",



        borderColor:

          "var(--border)",



        boxShadow:

          "var(--shadow-soft)",


      }}


    >







      {/* Search */}





      <div


        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          px-4
          py-3
          transition-all
          duration-300
          focus-within:-translate-y-0.5
        "



        style={{



          background:

            "color-mix(in srgb,var(--surfaceHover) 65%,transparent)",



          borderColor:

            "var(--border)",



        }}



      >




        <Search


          size={18}


          style={{


            color:

              "var(--muted)",


          }}



        />






        <input


          type="text"


          placeholder="Search documents, notes..."


          className="
            w-64
            bg-transparent
            text-sm
            outline-none
            placeholder:text-[var(--muted)]
          "



          style={{


            color:

              "var(--text)",


          }}



        />




      </div>









      {/* Notification */}





      <button



        className="
          group
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          border
          transition-all
          duration-300
          hover:-translate-y-0.5
        "



        style={{




          background:

            "var(--surface)",



          borderColor:

            "var(--border)",



          boxShadow:

            "0 8px 25px rgba(15,23,42,.05)",



        }}



      >





        <Bell


          size={20}


          className="
            transition-transform
            duration-300
            group-hover:scale-110
          "



          style={{


            color:

              "var(--accent-color)",


          }}




        />





      </button>







    </header>


  );

}