import {
  useState,
} from "react";

import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import CommandPalette from "../components/command/CommandPalette";


export default function WorkspaceLayout() {

const [searchOpen,setSearchOpen] =
useState(false);


return (

<div className="flex min-h-screen">


  <Sidebar />


  <main className="flex min-w-0 flex-1 flex-col">


    <Navbar
      onSearch={() =>
        setSearchOpen(true)
      }
    />


    <div className="flex-1 overflow-y-auto">

      <div
        className="
          mx-auto
          w-full
          max-w-[1700px]
          px-10
          py-8
        "
      >

        <Outlet />

      </div>

    </div>


  </main>



  {searchOpen && (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-start
        justify-center
        bg-black/60
        px-6
        pt-24
        backdrop-blur-sm
      "
    >

      <CommandPalette
        onClose={() =>
          setSearchOpen(false)
        }
      />


    </div>

  )}


</div>

);

}