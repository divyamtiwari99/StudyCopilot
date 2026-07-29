import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function WorkspaceLayout() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#060816]">

      <Sidebar />

      <main className="relative flex-1 overflow-y-auto">

        <Navbar />

        <div className="mx-auto w-full max-w-[1700px] px-10 py-10">

          <Outlet />

        </div>

      </main>

    </div>
  );
}