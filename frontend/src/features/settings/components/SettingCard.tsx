import type {
  ReactNode,
} from "react";


interface Props {

  title: string;

  description: string;

  value?: ReactNode;

  icon?: ReactNode;

  action?: ReactNode;

}


export default function SettingCard({

  title,

  description,

  value,

  icon,

  action,

}: Props) {

  return (

    <div
      className="
      group
      relative
      overflow-hidden
      rounded-2xl
      border
      border-white/10
      bg-white/[0.035]
      p-5
      backdrop-blur-3xl
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-cyan-500/20
      hover:bg-cyan-500/[0.05]
      "
    >


      <div
        className="
        absolute
        inset-x-0
        top-0
        h-px
        bg-gradient-to-r
        from-transparent
        via-cyan-400/60
        to-transparent
        opacity-0
        transition-opacity
        duration-300
        group-hover:opacity-100
        "
      />



      <div className="flex items-start justify-between gap-4">


        <div className="flex min-w-0 items-center gap-4">


          {icon && (

            <div
              className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/[0.05]
              transition-all
              duration-300
              group-hover:border-cyan-500/20
              group-hover:bg-cyan-500/10
              "
            >

              {icon}

            </div>

          )}



          <div className="min-w-0">


            <h3 className="truncate text-base font-semibold text-white">

              {title}

            </h3>


            <p className="mt-1 text-sm leading-5 text-slate-400">

              {description}

            </p>


          </div>


        </div>


        {action}


      </div>



      {value && (

        <div
          className="
          mt-5
          rounded-xl
          border
          border-white/10
          bg-black/20
          px-4
          py-3
          "
        >

          {value}

        </div>

      )}



    </div>

  );

}