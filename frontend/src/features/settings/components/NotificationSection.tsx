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

  function setAll(value: boolean) {
    updateNotifications({
      studyReminder: value,
      emailNotifications: value,
      aiUpdates: value,
      weeklyReport: value,
    });
  }

  return (
    <section
      className="
        overflow-hidden
        rounded-3xl
        border
        backdrop-blur-3xl
      "
      style={{
        borderColor:
          "var(--border)",
        backgroundColor:
          "var(--surface)",
      }}
    >
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
            className="text-cyan-500"
          />
        }
        action={
          <span
            className="
              rounded-full
              border
              px-4
              py-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
            "
            style={{
              borderColor:
                "var(--border)",
              backgroundColor:
                "var(--surfaceHover)",
              color:
                "var(--muted)",
            }}
          >
            {saving
              ? "Saving..."
              : `${enabledCount}/4 Active`}
          </span>
        }
      />

      <div
        className="
          grid
          gap-5
          p-6
          lg:grid-cols-[1.1fr_0.9fr]
        "
      >
        <div className="grid gap-5">
          <SettingCard
            title="Study Reminders"
            description="Get gentle reminders for planned study sessions."
            icon={
              <Calendar
                size={20}
                className="text-cyan-500"
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
                    "
                    style={{
                      color:
                        "var(--text)",
                    }}
                  >
                    {notifications.studyReminder
                      ? "Enabled"
                      : "Disabled"}
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                    "
                    style={{
                      color:
                        "var(--muted)",
                    }}
                  >
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
                className="text-amber-500"
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
                    "
                    style={{
                      color:
                        "var(--text)",
                    }}
                  >
                    {notifications.emailNotifications
                      ? "Enabled"
                      : "Disabled"}
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                    "
                    style={{
                      color:
                        "var(--muted)",
                    }}
                  >
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
                className="text-violet-500"
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
                    "
                    style={{
                      color:
                        "var(--text)",
                    }}
                  >
                    {notifications.aiUpdates
                      ? "Enabled"
                      : "Disabled"}
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                    "
                    style={{
                      color:
                        "var(--muted)",
                    }}
                  >
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
                className="text-emerald-500"
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
                    "
                    style={{
                      color:
                        "var(--text)",
                    }}
                  >
                    {notifications.weeklyReport
                      ? "Enabled"
                      : "Disabled"}
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                    "
                    style={{
                      color:
                        "var(--muted)",
                    }}
                  >
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
          <div
            className="
              rounded-3xl
              border
              p-5
            "
            style={{
              borderColor:
                "color-mix(in srgb,var(--accent-color) 15%,var(--border))",
              background:
                "linear-gradient(to bottom,color-mix(in srgb,var(--accent-color) 8%,transparent),color-mix(in srgb,var(--surface) 98%,transparent))",
            }}
          >
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.25em]
              "
              style={{
                color:
                  "var(--muted)",
              }}
            >
              Notification Health
            </p>

            <div
              className="
                mt-5
                h-2.5
                overflow-hidden
                rounded-full
              "
              style={{
                backgroundColor:
                  "var(--surfaceHover)",
              }}
            >
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

            <div
              className="
                mt-4
                flex
                items-center
                justify-between
              "
            >
              <span
                className="text-sm"
                style={{
                  color:
                    "var(--muted)",
                }}
              >
                Enabled settings
              </span>

              <span
                className="
                  text-sm
                  font-semibold
                "
                style={{
                  color:
                    "var(--text)",
                }}
              >
                {enabledCount}/4
              </span>
            </div>

            <p
              className="
                mt-4
                text-sm
                leading-6
              "
              style={{
                color:
                  "var(--muted)",
              }}
            >
              Use notifications to stay updated
              without leaving your workflow.
            </p>
          </div>

          <div
            className="
              grid
              gap-4
              rounded-3xl
              border
              p-5
            "
            style={{
              borderColor:
                "var(--border)",
              backgroundColor:
                "var(--surfaceHover)",
            }}
          >
            <div>
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                "
                style={{
                  color:
                    "var(--muted)",
                }}
              >
                Quick Actions
              </p>

              <p
                className="
                  mt-2
                  text-sm
                "
                style={{
                  color:
                    "var(--muted)",
                }}
              >
                Apply a notification preset instantly.
              </p>
            </div>

            <div
              className="
                flex
                flex-wrap
                gap-3
              "
            >
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
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-emerald-600
                  transition
                  hover:bg-emerald-500/10
                "
                style={{
                  borderColor:
                    "color-mix(in srgb,#10b981 20%,var(--border))",
                  backgroundColor:
                    "color-mix(in srgb,#10b981 8%,transparent)",
                }}
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
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  transition
                  hover:bg-black/5
                "
                style={{
                  borderColor:
                    "var(--border)",
                  backgroundColor:
                    "var(--surface)",
                  color:
                    "var(--text)",
                }}
              >
                Mute All
              </button>
            </div>

            <div
              className="
                rounded-2xl
                border
                p-4
              "
              style={{
                borderColor:
                  "var(--border)",
                backgroundColor:
                  "var(--surface)",
              }}
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
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-emerald-500
                  "
                />

                <p
                  className="
                    text-sm
                    font-semibold
                  "
                  style={{
                    color:
                      "var(--text)",
                  }}
                >
                  {enabledCount === 4
                    ? "All notifications enabled"
                    : enabledCount === 0
                      ? "All notifications muted"
                      : "Custom notification mix active"}
                </p>
              </div>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                "
                style={{
                  color:
                    "var(--muted)",
                }}
              >
                {notifications.studyReminder ||
                notifications.weeklyReport
                  ? "You will keep receiving learning-related reminders and reports."
                  : "Learning reminders are paused until you re-enable them."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}