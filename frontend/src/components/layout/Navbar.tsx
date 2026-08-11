import {
  Bell,
  Command,
  Search,
  Sparkles,
  UserCircle2,
  LogOut,
  Settings,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/auth.store";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";


interface NavbarProps {
  onSearch?: () => void;
}


export default function Navbar({
  onSearch,
}: NavbarProps) {


const user =
useAuthStore(
  (state) => state.user,
);


const logout =
useAuthStore(
  (state) => state.logout,
);


const [open,setOpen] =
useState(false);


const [notificationOpen,setNotificationOpen] =
useState(false);


const navigate =
useNavigate();



return (

<div className="flex items-center justify-between">


  {/* Left */}

  <div>

    <h2
      className="
        text-xl
        font-bold
        tracking-tight
        text-white
      "
    >
      Welcome Back 👋
    </h2>


    <p
      className="
        mt-0.5
        text-xs
        text-slate-400
      "
    >
      Continue your learning journey.
    </p>


  </div>



  {/* Right */}

  <div className="flex items-center gap-3">



    {/* Search */}

    <button
      onClick={onSearch}
      className="
        group
        flex
        h-10
        w-[220px]
        items-center
        justify-between
        rounded-xl
        border
        border-white/10
        bg-white/[0.04]
        px-3
        transition
        hover:border-[var(--accent-color)]
      "
    >


      <div className="flex items-center gap-2">


        <Search
          size={16}
          className="text-slate-400"
        />


        <span className="text-sm text-slate-500">
          Search...
        </span>


      </div>



      <div
        className="
          flex
          items-center
          gap-1
          rounded-md
          border
          border-white/10
          bg-white/5
          px-2
          py-1
          text-[11px]
          text-slate-400
        "
      >

        <Command size={11}/>

        K


      </div>


    </button>




    {/* AI */}

    <button
      onClick={() =>
        navigate("/dashboard/chat")
      }
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        border
        transition
        hover:scale-105
      "
      style={{
        backgroundColor:
          "color-mix(in srgb,var(--accent-color) 10%,transparent)",

        borderColor:
          "color-mix(in srgb,var(--accent-color) 20%,transparent)",
      }}
    >


      <Sparkles
        size={18}
        style={{
          color:
            "var(--accent-color)",
        }}
      />


    </button>




    {/* Notification */}

    <div className="relative">


      <button
        onClick={() => {

          setOpen(false);

          setNotificationOpen(
            !notificationOpen,
          );

        }}

        className="
          relative
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-white/10
          bg-white/[0.04]
          transition
          hover:scale-105
        "
      >

        <Bell
          size={18}
          className="text-white"
        />


        <span
          className="
            absolute
            right-2.5
            top-2.5
            h-2
            w-2
            rounded-full
            bg-red-500
          "
        />


      </button>



      <NotificationDropdown
        open={notificationOpen}
      />


    </div>
        {/* Profile */}


    <div className="relative">


      <button
        onClick={() => {

          setNotificationOpen(false);

          setOpen(!open);

        }}

        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-white/10
          bg-white/[0.04]
          px-3
          py-2
          transition
          hover:border-[var(--accent-color)]
        "
      >


        {user?.avatar ? (

          <img
            src={user.avatar}
            alt={user.name}
            className="
              h-8
              w-8
              rounded-full
              object-cover
            "
          />

        ) : (

          <UserCircle2
            size={30}
            style={{
              color:
                "var(--accent-color)",
            }}
          />

        )}



        <div className="text-left leading-tight">


          <p
            className="
              text-sm
              font-semibold
              text-white
            "
          >
            {user?.name ?? "User"}
          </p>


          <p
            className="
              text-[11px]
              text-slate-400
            "
          >
            {user?.plan ?? "Premium"}
          </p>


        </div>


      </button>



      {open && (

        <div
          className="
            absolute
            right-0
            top-14
            z-50
            w-44
            rounded-xl
            border
            border-white/10
            bg-[#111827]
            p-2
            shadow-xl
          "
        >


          <button
            onClick={() => {

              setOpen(false);

              navigate(
                "/dashboard/settings",
              );

            }}

            className="
              flex
              w-full
              items-center
              gap-2
              rounded-lg
              px-3
              py-2
              text-sm
              text-white
              hover:bg-white/10
            "
          >

            <Settings size={16}/>

            Settings


          </button>



          <button
            onClick={async () => {

              setOpen(false);

              await logout();

              navigate("/login");

            }}

            className="
              flex
              w-full
              items-center
              gap-2
              rounded-lg
              px-3
              py-2
              text-sm
              text-red-400
              hover:bg-white/10
            "
          >

            <LogOut size={16}/>

            Logout


          </button>


        </div>

      )}


    </div>


  </div>


</div>

);

}