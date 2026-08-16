import { Outlet } from "react-router-dom";



export default function AuthLayout() {

  return (

    <main

      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        px-6
      "

      style={{

        background:
          "var(--background)",

        color:
          "var(--text)",

      }}

    >



      {/* Ambient Background */}


      <div

        className="
          absolute
          inset-0
        "

        style={{

          background:
            "radial-gradient(circle at top left,color-mix(in srgb,var(--accent-color) 18%,transparent),transparent 35%), radial-gradient(circle at bottom right,color-mix(in srgb,var(--accent-color) 12%,transparent),transparent 35%)",

        }}

      />





      {/* Left Glow */}


      <div

        className="
          absolute
          -left-32
          top-0
          h-96
          w-96
          rounded-full
          blur-[120px]
          opacity-30
        "

        style={{

          background:
            "var(--accent-color)",

        }}

      />





      {/* Right Glow */}


      <div

        className="
          absolute
          -right-32
          bottom-0
          h-96
          w-96
          rounded-full
          blur-[120px]
          opacity-20
        "

        style={{

          background:
            "var(--accent-color)",

        }}

      />







      <div

        className="
          relative
          z-10
          w-full
          max-w-md
        "

      >

        <Outlet />

      </div>



    </main>

  );

}