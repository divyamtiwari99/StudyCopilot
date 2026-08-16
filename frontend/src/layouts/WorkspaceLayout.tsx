import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import CommandPalette from "../components/command/CommandPalette";

export default function WorkspaceLayout() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <div
      className="
        min-h-screen
        bg-[var(--background)]
        text-[var(--text)]
      "
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Workspace */}
      <main
        className="
          min-h-screen
          ml-0
          lg:ml-72
        "
      >
        {/* Top Navigation */}
        <Navbar
          onSearch={() => {
            setSearchOpen(true);
          }}
        />

        {/* Page Content */}
        <div
          className="
            px-4
            pb-8
            pt-6
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[1600px]
            "
          >
            <Outlet />
          </div>
        </div>
      </main>

      {/* Command Palette */}
      {searchOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-start
            justify-center
            bg-black/30
            px-6
            pt-24
            backdrop-blur-sm
          "
          onClick={() => {
            setSearchOpen(false);
          }}
        >
          <div
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <CommandPalette
              onClose={() => {
                setSearchOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}