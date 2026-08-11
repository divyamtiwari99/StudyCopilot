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

    <div className="
      flex
      min-h-screen
      overflow-hidden
      bg-[#09090B]
    ">


      <Sidebar />


      <div className="
        flex
        min-h-screen
        min-w-0
        flex-1
        flex-col
      ">


        <Topbar />


        <main className="
          flex-1
          overflow-y-auto
          px-8
          py-6
          scrollbar-hide
        ">

          {children}

        </main>


      </div>


    </div>

  );

}