import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import CommandPalette from "../components/command/CommandPalette";

export default function WorkspaceLayout() {
  const [searchOpen, setSearchOpen] =
    useState(false);

  const [
    mobileSidebarOpen,
    setMobileSidebarOpen,
  ] = useState(false);

  useEffect(() => {
    function handleShortcut(
      event: KeyboardEvent,
    ) {
      if (
        (event.ctrlKey ||
          event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setSearchOpen(true);
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileSidebarOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleShortcut,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleShortcut,
      );
    };
  }, []);

  useEffect(() => {
    if (!mobileSidebarOpen) {
      document.body.style.overflow = "";
      return;
    }

    const mediaQuery =
      window.matchMedia(
        "(max-width: 1023px)",
      );

    if (mediaQuery.matches) {
      document.body.style.overflow =
        "hidden";
    }

    const handleResize = () => {
      if (
        window.matchMedia(
          "(min-width: 1024px)",
        ).matches
      ) {
        setMobileSidebarOpen(false);
        document.body.style.overflow =
          "";
      } else if (mobileSidebarOpen) {
        document.body.style.overflow =
          "hidden";
      }
    };

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      document.body.style.overflow =
        "";

      window.removeEventListener(
        "resize",
        handleResize,
      );
    };
  }, [mobileSidebarOpen]);

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div
      className="
        min-h-screen
        overflow-x-hidden
        bg-[var(--background)]
        text-[var(--text)]
      "
    >
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          className="
            fixed
            inset-0
            z-40
            bg-black/20
            backdrop-blur-[2px]
            lg:hidden
          "
          onClick={
            closeMobileSidebar
          }
        />
      )}

      {/* Sidebar */}
      <Sidebar
        mobileOpen={
          mobileSidebarOpen
        }
        onClose={
          closeMobileSidebar
        }
      />

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
          onMenuOpen={() =>
            setMobileSidebarOpen(true)
          }
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