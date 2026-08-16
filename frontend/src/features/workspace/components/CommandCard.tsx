import {
  ArrowRight,
  Loader2,
  RotateCcw,
  Sparkles,
  type LucideIcon,
} from "lucide-react";


interface CommandCardProps {

  icon: LucideIcon;

  title: string;

  description: string;

  loading?: boolean;

  generated?: boolean;

  onClick: () => void;

  onOpen?: () => void;

}



export default function CommandCard({

  icon: Icon,

  title,

  description,

  loading = false,

  generated = false,

  onClick,

  onOpen,

}: CommandCardProps) {


  return (

    <div

      className="
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-3xl
        border
        p-6
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
      "

      style={{

        background:
          "var(--surface)",

        borderColor:
          "var(--border)",

        boxShadow:
          "var(--shadow-card)",

      }}

    >




      {/* Glow */}

      <div

        className="
          pointer-events-none
          absolute
          inset-0
          opacity-0
          transition
          duration-500
          group-hover:opacity-100
        "

      >

        <div

          className="
            absolute
            -right-10
            -top-10
            h-28
            w-28
            rounded-full
            blur-3xl
          "

          style={{

            background:

              "color-mix(in srgb,var(--accent-color) 15%,transparent)",

          }}

        />

      </div>







      {/* Icon */}

      <div

        className="
          relative
          z-10
          mb-5
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          border
          transition
          group-hover:scale-110
        "

        style={{


          color:

            "var(--accent-color)",


          background:

            "color-mix(in srgb,var(--accent-color) 10%,transparent)",



          borderColor:

            "color-mix(in srgb,var(--accent-color) 20%,transparent)",


        }}

      >

        <Icon size={24}/>


      </div>







      {/* Title */}

      <h3

        className="
          relative
          z-10
          text-lg
          font-semibold
        "

        style={{

          color:

            "var(--text)",

        }}

      >

        {title}


      </h3>







      {/* Description */}

      <p

        className="
          relative
          z-10
          mt-3
          flex-1
          text-sm
          leading-7
        "

        style={{

          color:

            "var(--muted)",

        }}

      >

        {description}


      </p>







      {/* Generated Badge */}

      {generated && (

        <div

          className="
            relative
            z-20
            mt-4
            inline-flex
            w-fit
            items-center
            rounded-full
            border
            px-3
            py-1
            text-xs
            font-semibold
          "

          style={{


            color:

              "var(--success)",



            background:

              "color-mix(in srgb,var(--success) 10%,transparent)",



            borderColor:

              "color-mix(in srgb,var(--success) 30%,transparent)",


          }}

        >

          ✓ Generated


        </div>

      )}







      {/* Generate / Regenerate */}

      <button

        onClick={onClick}

        disabled={loading}

        className="
          relative
          z-20
          mt-7
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          px-5
          py-3
          font-semibold
          text-white
          transition-all
          duration-300
          hover:opacity-90
          disabled:cursor-not-allowed
          disabled:opacity-70
        "

        style={{

          background:

            "var(--accent-color)",

        }}

      >

        {loading ? (

          <>

            <Loader2

              size={18}

              className="animate-spin"

            />

            Generating...

          </>


        ) : generated ? (

          <>


            <RotateCcw size={18}/>

            Regenerate


          </>


        ) : (

          <>


            <Sparkles size={18}/>

            Generate


          </>

        )}

      </button>







      {/* Open */}

      {generated && onOpen && (

        <button

          onClick={onOpen}

          className="
            relative
            z-20
            mt-3
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            px-5
            py-3
            font-semibold
            transition-all
            duration-300
            hover:-translate-y-0.5
          "

          style={{


            color:

              "var(--accent-color)",



            background:

              "color-mix(in srgb,var(--accent-color) 8%,transparent)",



            borderColor:

              "var(--accent-color)",


          }}

        >

          Open

          <ArrowRight size={18}/>


        </button>

      )}





    </div>

  );

}