import { Search } from "lucide-react";



export default function SearchBar() {


  return (


    <div


      className="
        relative
        w-full
        max-w-lg
      "


    >



      <Search


        size={18}


        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
        "



        style={{



          color:

            "var(--muted)",



        }}



      />







      <input



        type="text"



        placeholder="Search documents, notes, quizzes..."



        className="
          h-12
          w-full
          rounded-2xl
          border
          pl-12
          pr-4
          text-sm
          outline-none
          backdrop-blur-xl
          transition-all
          duration-300
          placeholder:text-[var(--muted)]
          focus:-translate-y-0.5
        "



        style={{




          background:

            "color-mix(in srgb,var(--surface),transparent 8%)",





          borderColor:

            "var(--border)",





          color:

            "var(--text)",



        }}




        onFocus={(e) => {


          e.currentTarget.style.borderColor =

            "var(--accent-color)";



          e.currentTarget.style.boxShadow =

            "0 0 0 4px color-mix(in srgb,var(--accent-color) 12%,transparent)";



        }}



        onBlur={(e) => {


          e.currentTarget.style.borderColor =

            "var(--border)";



          e.currentTarget.style.boxShadow =

            "none";



        }}



      />



    </div>



  );

}