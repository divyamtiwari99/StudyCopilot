import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";



type Props = {

  children: ReactNode;

};





export default function DashboardLayout({

  children,

}: Props) {



  return (

    <div

      className="
        flex
        min-h-screen
        overflow-hidden
        bg-[var(--background)]
        text-[var(--text)]
        transition-colors
        duration-300
      "

    >



      <Sidebar />





      <div

        className="
          flex
          min-h-screen
          min-w-0
          flex-1
          flex-col
          lg:ml-72
        "

      >



        <Topbar />





        <main

          className="
            flex-1
            overflow-y-auto
            px-5
            py-6
            sm:px-8
            lg:px-10
            scrollbar-hide
          "

        >



          <div

            className="
              mx-auto
              w-full
              max-w-[1600px]
            "

          >


            {children}


          </div>



        </main>



      </div>



    </div>

  );

}