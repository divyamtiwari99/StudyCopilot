import {
  Monitor,
  Moon,
  Palette,
  Sparkles,
  Sun,
} from "lucide-react";


import SectionHeader from "./SectionHeader";
import SettingCard from "./SettingCard";
import SettingSwitch from "./SettingSwitch";
import { useSettingsContext } from "./SettingsContext";


import type {
  ThemeMode,
  AccentColor,
} from "../types/settings.types";





interface ThemeOption {

  key: ThemeMode;

  label: string;

  description: string;

  icon: React.ReactNode;

}





interface AccentOption {

  key: AccentColor;

  label: string;

  color: string;

}





const THEME_OPTIONS: ThemeOption[] = [

  {
    key: "arctic",

    label: "Paper Light",

    description:
      "Clean workspace with a calm paper-like experience.",

    icon:
      <Sun size={20} />,

  },


  {
    key: "forest",

    label: "Forest",

    description:
      "Natural green workspace for focused learning.",

    icon:
      <Sparkles size={20} />,

  },


  {
    key: "sunset",

    label: "Sunset",

    description:
      "Warm colors for relaxed study sessions.",

    icon:
      <Palette size={20} />,

  },


  {
    key: "carbon",

    label: "Minimal",

    description:
      "Simple distraction-free workspace.",

    icon:
      <Monitor size={20} />,

  },


  {
    key: "midnight",

    label: "Midnight",

    description:
      "Dark mode for low light environments.",

    icon:
      <Moon size={20} />,

  },


];







const ACCENT_OPTIONS: AccentOption[] = [

  {
    key: "teal",
    label: "Teal",
    color: "#0F766E",
  },


  {
    key: "indigo",
    label: "Indigo",
    color: "#6366F1",
  },


  {
    key: "blue",
    label: "Blue",
    color: "#2563EB",
  },


  {
    key: "violet",
    label: "Violet",
    color: "#7C3AED",
  },


  {
    key: "emerald",
    label: "Emerald",
    color: "#10B981",
  },


  {
    key: "orange",
    label: "Orange",
    color: "#F97316",
  },


  {
    key: "rose",
    label: "Rose",
    color: "#F43F5E",
  },


  {
    key: "cyan",
    label: "Cyan",
    color: "#06B6D4",
  },


  {
    key: "amber",
    label: "Amber",
    color: "#F59E0B",
  },


];








export default function AppearanceSection() {


  const {

    settings,

    updateAppearance,

    saving,

  } = useSettingsContext();




  const appearance =
    settings.appearance;






  function handleThemeChange(
    theme: ThemeMode,
  ) {


    updateAppearance({

      theme,

    });


  }





  function handleAccentChange(
    accentColor: AccentColor,
  ) {


    updateAppearance({

      accentColor,

    });


  }





  function handleGlassToggle(
    value: boolean,
  ) {


    updateAppearance({

      glassEffect:value,

    });


  }





  function handleAnimationToggle(
    value:boolean,
  ) {


    updateAppearance({

      animations:value,

    });


  }





  function handleCompactToggle(
    value:boolean,
  ) {


    updateAppearance({

      compactMode:value,

    });


  }





  return (

    <section

      className="
        overflow-hidden
        rounded-3xl
        border
        border-[var(--border)]
        bg-[var(--surface)]
        shadow-[var(--shadow-card)]
      "

    >

      <SectionHeader

        eyebrow="APPEARANCE"

        title="Customize Interface"

        description="
          Personalize your StudyCopilot workspace.
        "

        icon={

          <Palette

            size={26}

            style={{
              color:
                "var(--accent-color)",
            }}

          />

        }

        action={

          <span

            className="
              rounded-full
              border
              border-[var(--border)]
              bg-[var(--surfaceHover)]
              px-4
              py-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[var(--muted)]
            "

          >

            {
              saving
                ? "Saving..."
                : "Live Preview"
            }

          </span>

        }

      />



      <div

        className="
          space-y-5
          p-6
        "

      >
              {/* Theme Selection */}


        <SettingCard

          title="Theme"

          description="
            Choose the visual style of your learning workspace.
          "

          icon={

            <Moon

              size={20}

              style={{
                color:
                  "var(--accent-color)",
              }}

            />

          }


          value={


            <div

              className="
                grid
                gap-3
                sm:grid-cols-2
              "

            >

              {THEME_OPTIONS.map(
                (option) => {


                  const active =
                    option.key === appearance.theme;



                  return (

                    <button

                      key={option.key}

                      type="button"

                      onClick={() =>
                        handleThemeChange(
                          option.key,
                        )
                      }


                      className={`
                        rounded-2xl
                        border
                        p-4
                        text-left
                        transition-all
                        duration-300
                        ${
                          active
                            ?
                              "border-[var(--accent-color)] bg-[color-mix(in_srgb,var(--accent-color)_8%,transparent)]"
                            :
                              "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent-color)]"
                        }
                      `}

                    >


                      <div

                        className="
                          flex
                          items-center
                          gap-3
                        "

                      >

                        <div

                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                          "

                          style={{

                            backgroundColor:
                              "color-mix(in srgb,var(--accent-color) 12%,transparent)",

                            color:
                              "var(--accent-color)",

                          }}

                        >

                          {option.icon}

                        </div>



                        <div>


                          <p

                            className="
                              font-semibold
                              text-[var(--text)]
                            "

                          >

                            {option.label}

                          </p>



                          <p

                            className="
                              mt-1
                              text-xs
                              text-[var(--muted)]
                            "

                          >

                            {option.description}

                          </p>


                        </div>


                      </div>


                    </button>

                  );


                },

              )}


            </div>


          }


        />







        {/* Glass */}


        <SettingCard


          title="Glass Interface"


          description="
            Add subtle depth and premium surfaces.
          "


          icon={

            <Sparkles

              size={20}

              style={{
                color:
                  "var(--accent-color)",
              }}

            />

          }



          value={


            <div

              className="
                flex
                items-center
                justify-between
                gap-4
              "

            >


              <div>


                <p

                  className="
                    font-semibold
                    text-[var(--text)]
                  "

                >

                  {
                    appearance.glassEffect
                      ? "Enabled"
                      : "Disabled"
                  }


                </p>



                <p

                  className="
                    mt-1
                    text-sm
                    text-[var(--muted)]
                  "

                >

                  Soft blur and premium depth effects.

                </p>


              </div>




              <SettingSwitch

                enabled={
                  appearance.glassEffect
                }


                onToggle={() =>
                  handleGlassToggle(
                    !appearance.glassEffect,
                  )
                }


              />


            </div>


          }


        />









        {/* Accent Colors */}



        <SettingCard


          title="Accent Color"


          description="
            Select your workspace identity color.
          "


          icon={

            <Palette

              size={20}

              style={{
                color:
                  "var(--accent-color)",
              }}

            />

          }



          value={


            <div

              className="
                space-y-5
              "

            >


              <div

                className="
                  flex
                  flex-wrap
                  gap-4
                "

              >


                {ACCENT_OPTIONS.map(
                  (option) => {


                    const active =
                      option.key ===
                      appearance.accentColor;



                    return (

                      <button


                        key={
                          option.key
                        }


                        type="button"


                        onClick={() =>
                          handleAccentChange(
                            option.key,
                          )
                        }



                        className={`
                          group
                          relative
                          h-10
                          w-10
                          rounded-full
                          transition-all
                          duration-300
                          hover:scale-110
                          ${
                            active
                              ?
                              "ring-4 ring-[color-mix(in_srgb,var(--accent-color)_25%,transparent)]"
                              :
                              ""
                          }
                        `}



                        style={{

                          backgroundColor:
                            option.color,

                        }}



                        aria-label={
                          option.label
                        }


                      >

                      </button>


                    );


                  },

                )}


              </div>





              <p

                className="
                  text-sm
                  text-[var(--muted)]
                "

              >

                Current accent:

                <span

                  className="
                    ml-2
                    font-semibold
                    text-[var(--text)]
                  "

                >

                  {
                    appearance.accentColor
                  }

                </span>


              </p>



            </div>


          }


        />









        {/* Layout */}



        <SettingCard


          title="Layout"


          description="
            Adjust workspace density.
          "


          icon={

            <Monitor

              size={20}

              style={{
                color:
                  "var(--accent-color)",
              }}

            />

          }




          value={


            <div

              className="
                flex
                items-center
                justify-between
                gap-4
              "

            >


              <div>


                <p

                  className="
                    font-semibold
                    text-[var(--text)]
                  "

                >

                  {
                    appearance.compactMode
                      ? "Compact"
                      : "Comfortable"
                  }

                </p>



                <p

                  className="
                    mt-1
                    text-sm
                    text-[var(--muted)]
                  "

                >

                  Choose spacing according to your workflow.

                </p>


              </div>





              <button


                type="button"


                onClick={() =>
                  handleCompactToggle(
                    !appearance.compactMode,
                  )
                }



                className="
                  rounded-xl
                  border
                  border-[var(--border)]
                  bg-[var(--surfaceHover)]
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-[var(--text)]
                  transition
                  hover:border-[var(--accent-color)]
                "


              >

                Change


              </button>



            </div>


          }


        />


        {/* Animations */}


        <SettingCard


          title="Animations"


          description="
            Control smooth transitions and motion effects.
          "


          icon={

            <Sparkles

              size={20}

              style={{
                color:
                  "var(--accent-color)",
              }}

            />

          }



          value={


            <div

              className="
                flex
                items-center
                justify-between
                gap-4
              "

            >


              <div>


                <p

                  className="
                    font-semibold
                    text-[var(--text)]
                  "

                >

                  {
                    appearance.animations
                      ? "Enabled"
                      : "Disabled"
                  }


                </p>



                <p

                  className="
                    mt-1
                    text-sm
                    text-[var(--muted)]
                  "

                >

                  Smooth interface interactions.

                </p>


              </div>





              <SettingSwitch


                enabled={
                  appearance.animations
                }



                onToggle={() =>
                  handleAnimationToggle(
                    !appearance.animations,
                  )
                }


              />



            </div>


          }


        />



      </div>






      {/* Quick Presets */}



      <div


        className="
          border-t
          border-[var(--border)]
          p-6
        "


      >



        <h3

          className="
            text-lg
            font-bold
            text-[var(--text)]
          "

        >

          Quick Presets


        </h3>




        <p

          className="
            mt-1
            text-sm
            text-[var(--muted)]
          "

        >

          Apply common workspace styles instantly.

        </p>





        <div


          className="
            mt-5
            grid
            gap-3
            sm:grid-cols-3
          "


        >



          <button


            type="button"



            onClick={() =>

              updateAppearance({

                theme:
                  "arctic",

                accentColor:
                  "teal",

                glassEffect:
                  true,

                animations:
                  true,

                compactMode:
                  false,

              })

            }



            className="
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-4
              text-left
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-[var(--accent-color)]
            "


          >


            <p

              className="
                font-semibold
                text-[var(--text)]
              "

            >

              Balanced


            </p>



            <p

              className="
                mt-1
                text-sm
                text-[var(--muted)]
              "

            >

              Default learning experience.

            </p>



          </button>








          <button


            type="button"



            onClick={() =>


              updateAppearance({

                theme:
                  "arctic",

                accentColor:
                  "violet",

                glassEffect:
                  true,

                animations:
                  true,

                compactMode:
                  true,

              })


            }



            className="
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-4
              text-left
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-[var(--accent-color)]
            "


          >



            <p

              className="
                font-semibold
                text-[var(--text)]
              "

            >

              Focus Mode


            </p>




            <p

              className="
                mt-1
                text-sm
                text-[var(--muted)]
              "

            >

              Compact workspace for deep study.

            </p>




          </button>









          <button


            type="button"



            onClick={() =>


              updateAppearance({

                theme:
                  "forest",

                accentColor:
                  "emerald",

                glassEffect:
                  false,

                animations:
                  false,

                compactMode:
                  true,

              })


            }




            className="
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-4
              text-left
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-[var(--accent-color)]
            "


          >



            <p

              className="
                font-semibold
                text-[var(--text)]
              "

            >

              Minimal


            </p>




            <p

              className="
                mt-1
                text-sm
                text-[var(--muted)]
              "

            >

              Clean distraction-free setup.

            </p>




          </button>





        </div>




      </div>




    </section>


  );


}