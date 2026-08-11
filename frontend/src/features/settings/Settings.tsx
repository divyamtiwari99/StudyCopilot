import {
  useRef,
  useState,
} from "react";

import {
  Bell,
  Bot,
  ChevronRight,
  CreditCard,
  HardDrive,
  Lock,
  Palette,
  ShieldCheck,
  User2,
  LogOut,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useSettingsContext,
} from "./components/SettingsContext";

import ProfileSection from "./components/ProfileSection";
import AIPreferencesSection from "./components/AIPreferencesSection";
import AppearanceSection from "./components/AppearanceSection";
import NotificationSection from "./components/NotificationSection";
import StorageSection from "./components/StorageSection";
import SecuritySection from "./components/SecuritySection";
import BillingSection from "./components/BillingSection";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";



const sections = [
  {
    id: "profile",
    icon: User2,
    title: "Profile",
    subtitle: "Manage your personal information.",
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Preferences",
    subtitle: "Customize StudyCopilot intelligence.",
  },
  {
    id: "appearance",
    icon: Palette,
    title: "Appearance",
    subtitle: "Theme, colors and interface.",
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Notifications",
    subtitle: "Reminders and alerts.",
  },
  {
    id: "storage",
    icon: HardDrive,
    title: "Storage",
    subtitle: "Workspace storage usage.",
  },
  {
    id: "security",
    icon: ShieldCheck,
    title: "Security",
    subtitle: "Password and account safety.",
  },
  {
    id: "billing",
    icon: CreditCard,
    title: "Billing",
    subtitle: "Subscription and invoices.",
  },
  {
    id: "privacy",
    icon: Lock,
    title: "Privacy",
    subtitle: "Control your data.",
  },
];


function SettingsContent() {

  const {
    save,
    saving,
    loading,
  } = useSettingsContext();

const logout =
  useAuthStore(
    (state) => state.logout,
  );

const navigate =
  useNavigate();



  const [
    activeSection,
    setActiveSection,
  ] = useState("profile");


  const contentRef =
    useRef<HTMLDivElement>(null);


  return (
    <div
      className="
        mx-auto
        flex
        h-[calc(100vh-90px)]
        max-w-[1400px]
        flex-col
        px-6
        py-6
      "
    >

      <div
        className="
          mb-4
          flex
          items-center
          justify-between
        "
      >

        <div>

          <h1
            className="
              text-4xl
              font-black
              text-white
            "
          >
            Settings
          </h1>

          <p
            className="
              mt-2
              text-slate-400
            "
          >
            Manage your StudyCopilot workspace,
            account, AI preferences and security.
          </p>

        </div>


        <button
          onClick={save}
          disabled={saving || loading}
          className="
            rounded-xl
            px-5
            py-2.5
            font-semibold
            text-white
            shadow-xl
            transition-all
            duration-300
            hover:-translate-y-1
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
          style={{
            background:
              "linear-gradient(90deg,var(--accent-color),#8b5cf6)",
          }}
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>

            <button
  onClick={async () => {
    await logout();
    navigate("/login");
  }}
  className="
    flex
    items-center
    gap-2
    rounded-xl
    border
    border-red-500/30
    bg-red-500/10
    px-5
    py-2.5
    font-semibold
    text-red-400
    transition
    hover:bg-red-500/20
  "
>
  <LogOut size={18}/>
  Logout
</button>


      </div>


      <div
        className="
          grid
          min-h-0
          flex-1
          gap-6
          xl:grid-cols-[240px_minmax(0,1fr)]
        "
      >

        <aside
          className="
            h-full
            overflow-y-auto
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            p-4
            backdrop-blur-3xl
            scrollbar-hide
          "
        >

          <p
            className="
              mb-5
              px-3
              text-xs
              font-semibold
              uppercase
              tracking-[0.35em]
              text-slate-500
            "
          >
            Navigation
          </p>
          
          <div className="space-y-2">

            {sections.map((section) => {

              const Icon =
                section.icon;

              const active =
                activeSection === section.id;


              return (
                <button
                  key={section.id}
                  onClick={() => {

                    setActiveSection(
                      section.id,
                    );

                    setTimeout(() => {

                      contentRef.current?.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });

                    }, 50);

                  }}
                  className={`
                    group
                    relative
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-2xl
                    px-4
                    py-3
                    text-left
                    transition-all
                    duration-300
                    ${
                      active
                        ? "bg-[color-mix(in_srgb,var(--accent-color)_10%,transparent)] border border-[color-mix(in_srgb,var(--accent-color)_30%,transparent)] shadow-lg"
                        : "border border-transparent hover:border-white/10 hover:bg-white/[0.04]"
                    }
                  `}
                >

                  {active && (
                    <span
                      className="
                        absolute
                        left-0
                        h-8
                        w-1
                        rounded-r-full
                      "
                      style={{
                        background:
                          "var(--accent-color)",
                      }}
                    />
                  )}


                  <div
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-4
                    "
                  >

                    <div
                      className={`
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        transition-all
                        duration-300
                        ${
                          active
                            ? "bg-[color-mix(in_srgb,var(--accent-color)_20%,transparent)]"
                            : "bg-white/[0.06]"
                        }
                      `}
                    >

                      <Icon
                        size={18}
                        style={{
                          color:
                            "var(--accent-color)",
                        }}
                      />

                    </div>


                    <div className="min-w-0 flex-1">

                      <p
                        className={`
                          truncate
                          font-semibold
                          transition-colors
                          ${
                            active
                              ? "text-white"
                              : "text-slate-200"
                          }
                        `}
                      >
                        {section.title}
                      </p>


                      <p
                        className="
                          mt-1
                          truncate
                          text-xs
                          text-slate-400
                        "
                      >
                        {section.subtitle}
                      </p>

                    </div>


                  </div>



                  <ChevronRight
                    size={18}
                    className="
                      shrink-0
                      transition-all
                      duration-300
                    "
                    style={{
                      color:
                        "var(--accent-color)",
                    }}
                  />

                </button>
              );

            })}

          </div>

        </aside>



        <main
          ref={contentRef}
          className="
            overflow-y-auto
            rounded-3xl
            scrollbar-hide
            pr-2
          "
        >

          <AnimatePresence mode="wait">

            {activeSection === "profile" && (

              <motion.div
                key="profile"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.25,
                }}
              >

                <ProfileSection />

              </motion.div>

            )}



            {activeSection === "ai" && (

              <motion.div
                key="ai"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.25,
                }}
              >

                <AIPreferencesSection />

              </motion.div>

            )}



            {activeSection === "appearance" && (

              <motion.div
                key="appearance"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.25,
                }}
              >

                <AppearanceSection />

              </motion.div>

            )}
                        {activeSection === "notifications" && (

              <motion.div
                key="notifications"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.25,
                }}
              >

                <NotificationSection />

              </motion.div>

            )}



            {activeSection === "storage" && (

              <motion.div
                key="storage"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.25,
                }}
              >

                <StorageSection />

              </motion.div>

            )}



            {activeSection === "security" && (

              <motion.div
                key="security"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.25,
                }}
              >

                <SecuritySection />

              </motion.div>

            )}



            {activeSection === "billing" && (

              <motion.div
                key="billing"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.25,
                }}
              >

                <BillingSection />

              </motion.div>

            )}



            {activeSection === "privacy" && (

              <motion.div
                key="privacy"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.25,
                }}
              >

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

                  <div
                    className="
                      border-b
                      border-white/10
                      px-6
                      py-5
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >

                      <Lock
                        size={24}
                        style={{
                          color:
                            "var(--accent-color)",
                        }}
                      />


                      <div>

                        <p
                          className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.3em]
                          "
                          style={{
                            color:
                              "var(--accent-color)",
                          }}
                        >
                          Privacy
                        </p>


                        <h2
                          className="
                            mt-2
                            text-2xl
                            font-bold
                            text-white
                          "
                        >
                          Control Your Data
                        </h2>

                      </div>

                    </div>

                  </div>



                  <div
                    className="
                      grid
                      gap-5
                      p-6
                      md:grid-cols-2
                    "
                  >

                    <div
                      className="
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        p-6
                      "
                    >

                      <h3
                        className="
                          text-lg
                          font-semibold
                          text-white
                        "
                      >
                        Data Collection
                      </h3>


                      <p
                        className="
                          mt-3
                          text-sm
                          leading-6
                          text-slate-400
                        "
                      >
                        Manage how StudyCopilot uses your learning data.
                      </p>

                    </div>
                                        <div
                      className="
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        p-6
                      "
                    >

                      <h3
                        className="
                          text-lg
                          font-semibold
                          text-white
                        "
                      >
                        Account Privacy
                      </h3>


                      <p
                        className="
                          mt-3
                          text-sm
                          leading-6
                          text-slate-400
                        "
                      >
                        Control visibility and account preferences.
                      </p>

                    </div>


                  </div>


                </section>


              </motion.div>

            )}


          </AnimatePresence>


        </main>


      </div>


    </div>
  );

}



export default function Settings() {

  return (
    <SettingsContent />
  );

}