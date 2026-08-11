import {
  Monitor,
  Moon,
  Palette,
  Sparkles,
} from "lucide-react";

import { useMemo } from "react";

import SectionHeader from "./SectionHeader";
import SettingCard from "./SettingCard";
import SettingSwitch from "./SettingSwitch";
import { useSettingsContext } from "./SettingsContext";


type ThemeMode =
  | "dark"
  | "oled";


type AccentColorKey =
  | "cyan"
  | "violet"
  | "emerald"
  | "amber";


interface AccentOption {

  key: AccentColorKey;

  label: string;

  colorClass: string;

  ringClass: string;

}



const ACCENT_OPTIONS: AccentOption[] = [

  {
    key: "cyan",
    label: "Cyan",
    colorClass: "bg-cyan-500",
    ringClass: "ring-cyan-400",
  },

  {
    key: "violet",
    label: "Violet",
    colorClass: "bg-violet-500",
    ringClass: "ring-violet-400",
  },

  {
    key: "emerald",
    label: "Emerald",
    colorClass: "bg-emerald-500",
    ringClass: "ring-emerald-400",
  },

  {
    key: "amber",
    label: "Amber",
    colorClass: "bg-amber-500",
    ringClass: "ring-amber-400",
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



  const themeLabel =
    useMemo(() => {

      return appearance.theme === "oled"
        ? "OLED Mode"
        : "Dark Mode";

    }, [
      appearance.theme,
    ]);



  const layoutLabel =
    appearance.compactMode
      ? "Compact"
      : "Comfortable";



  const accentKey =
    useMemo(() => {

      const normalized =
        appearance.accentColor.toLowerCase();


      const found =
        ACCENT_OPTIONS.find(
          (option) =>
            option.key === normalized,
        );


      return found?.key ?? "cyan";


    }, [
      appearance.accentColor,
    ]);



  function handleThemeToggle(
    nextEnabled: boolean,
  ) {

    const nextTheme: ThemeMode =
      nextEnabled
        ? "oled"
        : "dark";


    updateAppearance({
      theme: nextTheme,
    });

  }



  function handleGlassToggle(
    nextEnabled: boolean,
  ) {

    updateAppearance({
      glassEffect: nextEnabled,
    });

  }



  function handleAnimationsToggle(
    nextEnabled: boolean,
  ) {

    updateAppearance({
      animations: nextEnabled,
    });

  }



  function handleCompactToggle(
    nextEnabled: boolean,
  ) {

    updateAppearance({
      compactMode: nextEnabled,
    });

  }



  function handleAccentChange(
    accentColor: AccentColorKey,
  ) {

    updateAppearance({
      accentColor,
    });

  }



  const themeEnabled =
    appearance.theme === "oled";



  return (
    <section
      className="
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-3xl
      "
    >

      <SectionHeader

        eyebrow="APPEARANCE"

        title="Customize Interface"

        description="
        Personalize the look and feel
        of StudyCopilot.
        "

        icon={
          <Palette
            size={26}
            style={{
              color:"var(--accent-color)",
            }}
          />
        }

        action={

          <span
            className="
              rounded-full
              border
              border-white/10
              bg-white/[0.04]
              px-4
              py-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-slate-400
            "
          >

            {saving
              ? "Saving..."
              : "Live Preview"}

          </span>

        }

      />


      <div
        className="
          grid
          gap-5
          p-6
          lg:grid-cols-2
        "
      >
              <SettingCard

        title="Theme"

        description="Choose the overall application theme."

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
              flex
              items-center
              justify-between
              gap-4
            "
          >

            <div>

              <p
                className="
                  text-base
                  font-semibold
                  text-white
                "
              >

                {themeLabel}

              </p>


              <p
                className="
                  mt-1
                  text-sm
                  text-slate-400
                "
              >

                {appearance.theme === "oled"
                  ? "Deeper blacks for premium contrast."
                  : "Balanced contrast for daily use."}

              </p>


            </div>



            <SettingSwitch

              enabled={themeEnabled}

              onToggle={() =>
                handleThemeToggle(
                  !themeEnabled,
                )
              }

            />


          </div>

        }

      />





      <SettingCard

        title="Glass Interface"

        description="Enable premium glassmorphism effects."

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
                  text-base
                  font-semibold
                  text-white
                "
              >

                {appearance.glassEffect
                  ? "Enabled"
                  : "Disabled"}

              </p>


              <p
                className="
                  mt-1
                  text-sm
                  text-slate-400
                "
              >

                Soft blur surfaces and luminous depth.

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





      <SettingCard

        title="Accent Color"

        description="Primary accent used throughout the app."

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
              space-y-4
            "
          >


            <div
              className="
                flex
                flex-wrap
                gap-3
              "
            >


              {ACCENT_OPTIONS.map(
                (option) => {


                  const isActive =
                    accentKey === option.key;



                  return (

                    <button

                      key={option.key}

                      type="button"

                      onClick={() =>
                        handleAccentChange(
                          option.key,
                        )
                      }


                      aria-label={
                        `Set accent color to ${option.label}`
                      }


                      aria-pressed={
                        isActive
                      }


                      className={[
                        "h-9 w-9 rounded-full transition duration-300",
                        option.colorClass,
                        "ring-2 ring-transparent hover:scale-110",
                        isActive
                          ? `ring-white ${option.ringClass}`
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}

                    />

                  );


                },
              )}


            </div>




            <p
              className="
                text-sm
                text-slate-400
              "
            >

              Current accent:

              <span
                className="
                  ml-2
                  font-semibold
                  text-slate-200
                "
              >

                {appearance.accentColor}

              </span>

            </p>


          </div>


        }

      />





      <SettingCard

        title="Layout"

        description="Choose your preferred workspace density."

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
                  text-base
                  font-semibold
                  text-white
                "
              >

                {layoutLabel}

              </p>


              <p
                className="
                  mt-1
                  text-sm
                  text-slate-400
                "
              >

                {appearance.compactMode
                  ? "More information on screen at once."
                  : "More spacious spacing for comfort."}

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
                px-4
                py-2
                text-sm
                font-medium
                transition
              "

              style={{
                borderColor:
                  "color-mix(in srgb,var(--accent-color) 20%,transparent)",

                backgroundColor:
                  "color-mix(in srgb,var(--accent-color) 10%,transparent)",

                color:
                  "var(--accent-color)",
              }}

            >

              Change

            </button>


          </div>


        }

      />





      <SettingCard

        title="Animations"

        description="Control interface motion effects."

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
                  text-base
                  font-semibold
                  text-white
                "
              >

                {appearance.animations
                  ? "Enabled"
                  : "Disabled"}

              </p>


              <p
                className="
                  mt-1
                  text-sm
                  text-slate-400
                "
              >

                Smooth transitions and effects.

              </p>


            </div>



            <SettingSwitch

              enabled={
                appearance.animations
              }

              onToggle={() =>
                handleAnimationsToggle(
                  !appearance.animations,
                )
              }

            />


          </div>


        }

      />


      </div>





      <div
        className="
          border-t
          border-white/10
          p-6
        "
      >

        <h3
          className="
            text-lg
            font-bold
            text-white
          "
        >

          Quick Actions

        </h3>


        <p
          className="
            mt-1
            text-sm
            text-slate-400
          "
        >

          Apply common workspace preferences instantly.

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

            onClick={() => {

              updateAppearance({
                theme: "dark",
                glassEffect: true,
                animations: true,
                compactMode: false,
              });

            }}

            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.04]
              p-4
              text-left
              transition
              hover:bg-white/[0.08]
            "

          >

            <p
              className="
                font-semibold
                text-white
              "
            >

              Balanced

            </p>


            <p
              className="
                mt-1
                text-sm
                text-slate-400
              "
            >

              Default experience.

            </p>


          </button>





          <button

            type="button"

            onClick={() => {

              updateAppearance({
                theme: "oled",
                glassEffect: true,
                animations: true,
                compactMode: true,
              });

            }}

            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.04]
              p-4
              text-left
              transition
              hover:bg-white/[0.08]
            "

          >

            <p
              className="
                font-semibold
                text-white
              "
            >

              Focus

            </p>


            <p
              className="
                mt-1
                text-sm
                text-slate-400
              "
            >

              Dark OLED workspace.

            </p>


                      </button>





          <button

            type="button"

            onClick={() => {

              updateAppearance({
                theme: "dark",
                glassEffect: false,
                animations: false,
                compactMode: true,
              });

            }}

            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.04]
              p-4
              text-left
              transition
              hover:bg-white/[0.08]
            "

          >

            <p
              className="
                font-semibold
                text-white
              "
            >

              Minimal

            </p>


            <p
              className="
                mt-1
                text-sm
                text-slate-400
              "
            >

              Lightweight interface.

            </p>


          </button>


        </div>


      </div>


    </section>
  );
}
          