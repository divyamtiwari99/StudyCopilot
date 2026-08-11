import {
  BrainCircuit,
  BookOpen,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import SectionHeader from "./SectionHeader";
import SettingCard from "./SettingCard";
import SettingSwitch from "./SettingSwitch";
import { useSettingsContext } from "./SettingsContext";


type AIMode =
  | "study"
  | "assistant"
  | "hybrid";


type ResponseLength =
  | "short"
  | "balanced"
  | "detailed";


interface ModeOption {

  value: AIMode;

  title: string;

  description: string;

}


interface LengthOption {

  value: ResponseLength;

  title: string;

  description: string;

}



const MODE_OPTIONS: ModeOption[] = [

  {
    value: "study",
    title: "Study Mode",
    description:
      "Structured learning-first responses.",
  },

  {
    value: "assistant",
    title: "Assistant",
    description:
      "Fast productivity focused answers.",
  },

  {
    value: "hybrid",
    title: "Hybrid AI",
    description:
      "Balanced reasoning with learning.",
  },

];



const LENGTH_OPTIONS: LengthOption[] = [

  {
    value: "short",
    title: "Short",
    description:
      "Quick and concise answers.",
  },

  {
    value: "balanced",
    title: "Balanced",
    description:
      "Clear depth with explanation.",
  },

  {
    value: "detailed",
    title: "Detailed",
    description:
      "Examples and deeper context.",
  },

];



export default function AIPreferencesSection() {


  const {
    settings,
    updateAI,
    saving,
  } = useSettingsContext();



  const ai =
    settings.ai;



  const modeOption =
    MODE_OPTIONS.find(
      (option) =>
        option.value === ai.defaultMode,
    ) ?? MODE_OPTIONS[2];



  const lengthOption =
    LENGTH_OPTIONS.find(
      (option) =>
        option.value === ai.responseLength,
    ) ?? LENGTH_OPTIONS[1];



  function setMode(
    value: AIMode,
  ) {

    updateAI({
      defaultMode: value,
    });

  }



  function setResponseLength(
    value: ResponseLength,
  ) {

    updateAI({
      responseLength: value,
    });

  }



  function toggleCitations() {

    updateAI({
      citations:
        !ai.citations,
    });

  }



  function toggleDeepReasoning() {

    updateAI({
      deepReasoning:
        !ai.deepReasoning,
    });

  }



  return (

    <section className="
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-white/[0.04]
      backdrop-blur-3xl
    ">


      <SectionHeader

        eyebrow="AI PREFERENCES"

        title="StudyCopilot Intelligence"

        description="
        Control how StudyCopilot thinks,
        responds and explains concepts.
        "

        icon={
          <BrainCircuit
            size={26}
            className="text-violet-400"
          />
        }


        action={

          <span className="
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
          ">

            {saving
              ? "Saving..."
              : "AI Ready"}

          </span>

        }

      />


      <div className="
        grid
        gap-5
        p-6
        lg:grid-cols-2
      ">
              <SettingCard

          title="Default AI Mode"

          description="Choose how StudyCopilot answers by default."

          icon={
            <Sparkles
              size={20}
              className="text-violet-400"
            />
          }


          value={

            <div className="space-y-4">


              <div className="flex items-center justify-between gap-3">


                <div>

                  <p className="text-base font-semibold text-white">

                    {modeOption.title}

                  </p>


                  <p className="mt-1 text-sm text-slate-400">

                    {modeOption.description}

                  </p>


                </div>


                <ChevronRight
                  size={18}
                  className="text-slate-500"
                />


              </div>



              <div className="grid gap-3 sm:grid-cols-3">


                {MODE_OPTIONS.map((option) => {


                  const active =
                    option.value === ai.defaultMode;



                  return (

                    <button

                      key={option.value}

                      type="button"

                      onClick={() =>
                        setMode(option.value)
                      }


                      className={[
                        "rounded-xl border px-3 py-3 text-left transition-all duration-300",
                        active
                          ? "border-violet-500/40 bg-violet-500/10 shadow-lg shadow-violet-500/10"
                          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]",
                      ].join(" ")}

                    >


                      <p className="text-sm font-semibold text-white">

                        {option.title}

                      </p>



                      <p className="mt-1 text-xs leading-5 text-slate-500">

                        {option.description}

                      </p>


                    </button>

                  );


                })}


              </div>


            </div>

          }

        />




        <SettingCard

          title="Study Behaviour"

          description="Configure how detailed explanations should be."

          icon={
            <BookOpen
              size={20}
              className="text-cyan-400"
            />
          }


          value={


            <div className="space-y-4">


              <div className="flex items-center justify-between gap-3">


                <div>

                  <p className="text-base font-semibold text-white">

                    {lengthOption.title}

                  </p>


                  <p className="mt-1 text-sm text-slate-400">

                    {lengthOption.description}

                  </p>


                </div>


                <ChevronRight
                  size={18}
                  className="text-slate-500"
                />


              </div>



              <div className="grid gap-3 sm:grid-cols-3">


                {LENGTH_OPTIONS.map((option) => {


                  const active =
                    option.value === ai.responseLength;



                  return (

                    <button

                      key={option.value}

                      type="button"

                      onClick={() =>
                        setResponseLength(option.value)
                      }


                      className={[
                        "rounded-xl border px-3 py-3 text-left transition-all duration-300",
                        active
                          ? "border-cyan-500/40 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]",
                      ].join(" ")}

                    >


                      <p className="text-sm font-semibold text-white">

                        {option.title}

                      </p>



                      <p className="mt-1 text-xs leading-5 text-slate-500">

                        {option.description}

                      </p>


                    </button>

                  );


                })}


              </div>


            </div>


          }

        />
                <SettingCard

          title="Citations"

          description="Show supporting references when available."

          icon={
            <Sparkles
              size={20}
              className="text-emerald-400"
            />
          }


          value={

            <div className="flex items-center justify-between gap-4">


              <div>

                <p className="text-base font-semibold text-white">

                  {ai.citations
                    ? "Enabled"
                    : "Disabled"}

                </p>


                <p className="mt-1 text-sm text-slate-400">

                  Helps verify sources and improve trust.

                </p>


              </div>



              <SettingSwitch

                enabled={
                  ai.citations
                }

                onToggle={
                  toggleCitations
                }

              />


            </div>

          }

        />




        <SettingCard

          title="Deep Reasoning"

          description="Spend more effort on complex questions and analysis."

          icon={
            <BrainCircuit
              size={20}
              className="text-violet-400"
            />
          }


          value={

            <div className="flex items-center justify-between gap-4">


              <div>

                <p className="text-base font-semibold text-white">

                  {ai.deepReasoning
                    ? "Enabled"
                    : "Disabled"}

                </p>


                <p className="mt-1 text-sm text-slate-400">

                  Useful for research and multi-step reasoning.

                </p>


              </div>



              <SettingSwitch

                enabled={
                  ai.deepReasoning
                }

                onToggle={
                  toggleDeepReasoning
                }

              />


            </div>

          }

        />


      </div>


    </section>

  );

}