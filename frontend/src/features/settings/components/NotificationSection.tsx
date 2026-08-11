import {
  Bell,
  Calendar,
  Check,
  Mail,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import SectionHeader from "./SectionHeader";
import SettingCard from "./SettingCard";
import SettingSwitch from "./SettingSwitch";
import { useSettingsContext } from "./SettingsContext";


export default function NotificationSection() {


  const {
    settings,
    updateNotifications,
    saving,
  } = useSettingsContext();



  const notifications =
    settings.notifications;



  const enabledCount = [

    notifications.studyReminder,

    notifications.emailNotifications,

    notifications.aiUpdates,

    notifications.weeklyReport,

  ].filter(Boolean).length;



  const completionPercent =
    (enabledCount / 4) * 100;



  function setAll(
    value: boolean,
  ) {

    updateNotifications({

      studyReminder: value,

      emailNotifications: value,

      aiUpdates: value,

      weeklyReport: value,

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

        eyebrow="NOTIFICATIONS"

        title="Stay in the Loop"

        description="
        Control reminders, product updates
        and weekly learning summaries.
        "

        icon={
          <Bell
            size={26}
            className="text-cyan-400"
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
              : `${enabledCount}/4 Active`}

          </span>

        }

      />



      <div className="
        grid
        gap-5
        p-6
        lg:grid-cols-[1.1fr_0.9fr]
      ">


        <div className="
          grid
          gap-5
        ">
                      <SettingCard

            title="Study Reminders"

            description="Get gentle reminders for planned study sessions."

            icon={
              <Calendar
                size={20}
                className="text-cyan-400"
              />
            }


            value={

              <div className="
                flex
                items-center
                justify-between
                gap-4
              ">


                <div>

                  <p className="text-base font-semibold text-white">

                    {notifications.studyReminder
                      ? "Enabled"
                      : "Disabled"}

                  </p>


                  <p className="mt-1 text-sm text-slate-400">

                    Helps keep your study plan on track.

                  </p>


                </div>



                <SettingSwitch

                  enabled={
                    notifications.studyReminder
                  }

                  onToggle={() =>
                    updateNotifications({

                      studyReminder:
                        !notifications.studyReminder,

                    })
                  }

                />


              </div>

            }

          />




          <SettingCard

            title="Email Notifications"

            description="Receive important account and activity emails."

            icon={
              <Mail
                size={20}
                className="text-amber-400"
              />
            }


            value={

              <div className="
                flex
                items-center
                justify-between
                gap-4
              ">


                <div>

                  <p className="text-base font-semibold text-white">

                    {notifications.emailNotifications
                      ? "Enabled"
                      : "Disabled"}

                  </p>


                  <p className="mt-1 text-sm text-slate-400">

                    Updates, security and support alerts.

                  </p>


                </div>



                <SettingSwitch

                  enabled={
                    notifications.emailNotifications
                  }

                  onToggle={() =>
                    updateNotifications({

                      emailNotifications:
                        !notifications.emailNotifications,

                    })
                  }

                />


              </div>

            }

          />




          <SettingCard

            title="AI Updates"

            description="Hear about new AI features and improvements."

            icon={
              <Sparkles
                size={20}
                className="text-violet-400"
              />
            }


            value={

              <div className="
                flex
                items-center
                justify-between
                gap-4
              ">


                <div>

                  <p className="text-base font-semibold text-white">

                    {notifications.aiUpdates
                      ? "Enabled"
                      : "Disabled"}

                  </p>


                  <p className="mt-1 text-sm text-slate-400">

                    Product announcements and AI upgrades.

                  </p>


                </div>



                <SettingSwitch

                  enabled={
                    notifications.aiUpdates
                  }

                  onToggle={() =>
                    updateNotifications({

                      aiUpdates:
                        !notifications.aiUpdates,

                    })
                  }

                />


              </div>

            }

          />




          <SettingCard

            title="Weekly Report"

            description="Get a weekly summary of your learning progress."

            icon={
              <TrendingUp
                size={20}
                className="text-emerald-400"
              />
            }


            value={

              <div className="
                flex
                items-center
                justify-between
                gap-4
              ">


                <div>

                  <p className="text-base font-semibold text-white">

                    {notifications.weeklyReport
                      ? "Enabled"
                      : "Disabled"}

                  </p>


                  <p className="mt-1 text-sm text-slate-400">

                    A digest of your learning momentum.

                  </p>


                </div>



                <SettingSwitch

                  enabled={
                    notifications.weeklyReport
                  }

                  onToggle={() =>
                    updateNotifications({

                      weeklyReport:
                        !notifications.weeklyReport,

                    })
                  }

                />


              </div>

            }

          />


        </div>
                <div className="space-y-5">


          <div className="
            rounded-3xl
            border
            border-cyan-500/10
            bg-gradient-to-b
            from-cyan-500/[0.08]
            to-white/[0.02]
            p-5
          ">


            <p className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.25em]
              text-slate-500
            ">

              Notification Health

            </p>



            <div className="
              mt-5
              h-2.5
              overflow-hidden
              rounded-full
              bg-white/5
            ">


              <div

                className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-cyan-400
                  via-sky-500
                  to-violet-500
                  transition-all
                  duration-500
                "

                style={{
                  width: `${completionPercent}%`,
                }}

              />


            </div>



            <div className="
              mt-4
              flex
              items-center
              justify-between
            ">


              <span className="text-sm text-slate-400">

                Enabled settings

              </span>



              <span className="
                text-sm
                font-semibold
                text-white
              ">

                {enabledCount}/4

              </span>


            </div>



            <p className="
              mt-4
              text-sm
              leading-6
              text-slate-400
            ">

              Use notifications to stay updated without
              leaving your workflow.

            </p>


          </div>




          <div className="
            grid
            gap-4
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            p-5
          ">


            <div>

              <p className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.25em]
                text-slate-500
              ">

                Quick Actions

              </p>


              <p className="
                mt-2
                text-sm
                text-slate-400
              ">

                Apply a notification preset instantly.

              </p>


            </div>




            <div className="
              flex
              flex-wrap
              gap-3
            ">


              <button

                type="button"

                onClick={() =>
                  setAll(true)
                }


                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-emerald-500/20
                  bg-emerald-500/10
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-emerald-300
                  transition
                  hover:bg-emerald-500/20
                "

              >

                <Check size={16} />

                Enable All

              </button>




              <button

                type="button"

                onClick={() =>
                  setAll(false)
                }


                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-slate-300
                  transition
                  hover:bg-white/[0.08]
                "

              >

                Mute All

              </button>


            </div>




            <div className="
              rounded-2xl
              border
              border-white/10
              bg-black/10
              p-4
            ">


              <div className="
                flex
                items-center
                gap-3
              ">


                <div className="
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-emerald-400
                " />



                <p className="
                  text-sm
                  font-semibold
                  text-white
                ">


                  {enabledCount === 4

                    ? "All notifications enabled"

                    : enabledCount === 0

                      ? "All notifications muted"

                      : "Custom notification mix active"

                  }


                </p>


              </div>




              <p className="
                mt-3
                text-sm
                leading-6
                text-slate-400
              ">


                {notifications.studyReminder ||
                notifications.weeklyReport

                  ? "You will keep receiving learning-related reminders and reports."

                  : "Learning reminders are paused until you re-enable them."

                }


              </p>


            </div>


          </div>


        </div>


      </div>


    </section>

  );

}