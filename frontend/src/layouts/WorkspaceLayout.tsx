import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function WorkspaceLayout() {
  return (
    <div className="flex min-h-screen bg-[#060816]">

      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">

        <Navbar />

        <div className="flex-1 overflow-y-auto">

          <div className="mx-auto w-full max-w-[1700px] px-10 py-8">

            <Outlet />

          </div>

        </div>

      </main>

    </div>
  );
}