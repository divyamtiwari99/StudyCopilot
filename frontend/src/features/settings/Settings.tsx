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

import { toast } from "sonner";

import {
  useNavigate,
} from "react-router-dom";

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

import {
  useAuthStore,
} from "@/store/auth.store";


const sections = [
  {
    id:"profile",
    icon:User2,
    title:"Profile",
    subtitle:"Manage your personal information.",
  },
  {
    id:"ai",
    icon:Bot,
    title:"AI Preferences",
    subtitle:"Customize StudyCopilot intelligence.",
  },
  {
    id:"appearance",
    icon:Palette,
    title:"Appearance",
    subtitle:"Theme, colors and interface.",
  },
  {
    id:"notifications",
    icon:Bell,
    title:"Notifications",
    subtitle:"Reminders and alerts.",
  },
  {
    id:"storage",
    icon:HardDrive,
    title:"Storage",
    subtitle:"Workspace storage usage.",
  },
  {
    id:"security",
    icon:ShieldCheck,
    title:"Security",
    subtitle:"Password and account safety.",
  },
  {
    id:"billing",
    icon:CreditCard,
    title:"Billing",
    subtitle:"Subscription and invoices.",
  },
  {
    id:"privacy",
    icon:Lock,
    title:"Privacy",
    subtitle:"Control your data.",
  },
];


function SettingsContent(){

  const {
    save,
    saving,
    loading,
  } = useSettingsContext();


  const logout =
    useAuthStore(
      state=>state.logout,
    );


  const navigate =
    useNavigate();


  const [
    activeSection,
    setActiveSection,
  ] = useState("profile");


  const contentRef =
    useRef<HTMLDivElement>(null);



  return(
    <div
      className="
        mx-auto
        flex
        min-h-[calc(100vh-90px)]
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
          gap-4
        "
      >

        <div>

          <h1
            className="
              text-4xl
              font-black
            "
            style={{
              color:"var(--text)",
            }}
          >
            Settings
          </h1>


          <p
            className="
              mt-2
              text-sm
            "
            style={{
              color:"var(--muted)",
            }}
          >
            Manage your StudyCopilot workspace,
            account, AI preferences and security.
          </p>

        </div>



        <div
          className="
            flex
            gap-3
          "
        >

          <button
            onClick={async () => {
              try {
                await save();
                toast.success("Settings saved successfully.");
              } catch {
                toast.error("Failed to save settings. Please try again.");
              }
            }}
            disabled={
              saving ||
              loading
            }
            className="
              rounded-xl
              px-5
              py-2.5
              font-semibold
              text-white
              transition
              hover:-translate-y-1
              disabled:opacity-60
            "
            style={{
              background:
                "linear-gradient(90deg,var(--accent-color),#8b5cf6)",
            }}
          >

            {
              saving
              ?
              "Saving..."
              :
              "Save Changes"
            }

          </button>


          <button
            onClick={async()=>{
              await logout();
              navigate("/login");
            }}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              px-5
              py-2.5
              font-semibold
              text-red-400
              transition
            "
            style={{
              borderColor:
                "color-mix(in srgb,#ef4444 30%,transparent)",
              background:
                "color-mix(in srgb,#ef4444 10%,transparent)",
            }}
          >

            <LogOut size={18}/>

            Logout

          </button>

        </div>

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
            p-4
            backdrop-blur-3xl
          "
          style={{
            background:
              "var(--surface)",
            borderColor:
              "var(--border)",
          }}
        >


          <p
            className="
              mb-5
              px-3
              text-xs
              font-semibold
              uppercase
              tracking-[0.35em]
            "
            style={{
              color:
                "var(--muted)",
            }}
          >
            Navigation
          </p>


          <div className="space-y-2">

            {sections.map((section)=>{

              const Icon =
                section.icon;

              const active =
                activeSection===section.id;


              return(
                <button
                  key={section.id}
                  onClick={()=>{
                    setActiveSection(
                      section.id,
                    );

                    setTimeout(()=>{
                      contentRef.current?.scrollTo({
                        top:0,
                        behavior:"smooth",
                      });
                    },50);
                  }}
                  className="
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
                    transition
                  "
                  style={{
                    background:active
                    ?
                    "color-mix(in srgb,var(--accent-color) 10%,transparent)"
                    :
                    "transparent",

                    border:active
                    ?
                    "1px solid color-mix(in srgb,var(--accent-color) 30%,transparent)"
                    :
                    "1px solid transparent",
                  }}
                >

                  <div className="
                    flex
                    items-center
                    gap-4
                  ">

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
                        background:
                        "var(--surfaceHover)",
                      }}
                    >

                      <Icon
                        size={18}
                        style={{
                          color:
                          "var(--accent-color)",
                        }}
                      />

                    </div>


                    <div>

                      <p
                        className="font-semibold"
                        style={{
                          color:
                          "var(--text)",
                        }}
                      >
                        {section.title}
                      </p>

                      <p
                        className="mt-1 text-xs"
                        style={{
                          color:
                          "var(--muted)",
                        }}
                      >
                        {section.subtitle}
                      </p>

                    </div>

                  </div>


                  <ChevronRight
                    size={18}
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
            pr-2
            scrollbar-hide
          "
        >

          <AnimatePresence mode="wait">


            {activeSection==="profile" && (
              <motion.div
                key="profile"
                initial={{
                  opacity:0,
                  y:20,
                }}
                animate={{
                  opacity:1,
                  y:0,
                }}
                exit={{
                  opacity:0,
                  y:-20,
                }}
                transition={{
                  duration:0.25,
                }}
              >

                <ProfileSection />

              </motion.div>
            )}



            {activeSection==="ai" && (
              <motion.div
                key="ai"
                initial={{
                  opacity:0,
                  y:20,
                }}
                animate={{
                  opacity:1,
                  y:0,
                }}
                exit={{
                  opacity:0,
                  y:-20,
                }}
                transition={{
                  duration:0.25,
                }}
              >

                <AIPreferencesSection />

              </motion.div>
            )}




            {activeSection==="appearance" && (
              <motion.div
                key="appearance"
                initial={{
                  opacity:0,
                  y:20,
                }}
                animate={{
                  opacity:1,
                  y:0,
                }}
                exit={{
                  opacity:0,
                  y:-20,
                }}
                transition={{
                  duration:0.25,
                }}
              >

                <AppearanceSection />

              </motion.div>
            )}




            {activeSection==="notifications" && (
              <motion.div
                key="notifications"
                initial={{
                  opacity:0,
                  y:20,
                }}
                animate={{
                  opacity:1,
                  y:0,
                }}
                exit={{
                  opacity:0,
                  y:-20,
                }}
                transition={{
                  duration:0.25,
                }}
              >

                <NotificationSection />

              </motion.div>
            )}




            {activeSection==="storage" && (
              <motion.div
                key="storage"
                initial={{
                  opacity:0,
                  y:20,
                }}
                animate={{
                  opacity:1,
                  y:0,
                }}
                exit={{
                  opacity:0,
                  y:-20,
                }}
                transition={{
                  duration:0.25,
                }}
              >

                <StorageSection />

              </motion.div>
            )}




            {activeSection==="security" && (
              <motion.div
                key="security"
                initial={{
                  opacity:0,
                  y:20,
                }}
                animate={{
                  opacity:1,
                  y:0,
                }}
                exit={{
                  opacity:0,
                  y:-20,
                }}
                transition={{
                  duration:0.25,
                }}
              >

                <SecuritySection />

              </motion.div>
            )}




            {activeSection==="billing" && (
              <motion.div
                key="billing"
                initial={{
                  opacity:0,
                  y:20,
                }}
                animate={{
                  opacity:1,
                  y:0,
                }}
                exit={{
                  opacity:0,
                  y:-20,
                }}
                transition={{
                  duration:0.25,
                }}
              >

                <BillingSection />

              </motion.div>
            )}



            {activeSection==="privacy" && (

              <motion.div
                key="privacy"
                initial={{
                  opacity:0,
                  y:20,
                }}
                animate={{
                  opacity:1,
                  y:0,
                }}
                exit={{
                  opacity:0,
                  y:-20,
                }}
                transition={{
                  duration:0.25,
                }}
              >

                <section
                  className="
                    overflow-hidden
                    rounded-3xl
                    border
                    backdrop-blur-3xl
                  "
                  style={{
                    background:
                      "var(--surface)",

                    borderColor:
                      "var(--border)",
                  }}
                >


                  <div
                    className="
                      border-b
                      px-6
                      py-5
                    "
                    style={{
                      borderColor:
                        "var(--border)",
                    }}
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
                          "
                          style={{
                            color:
                              "var(--text)",
                          }}
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
                        p-6
                      "
                      style={{
                        background:
                          "var(--surfaceHover)",

                        borderColor:
                          "var(--border)",
                      }}
                    >

                      <h3
                        className="
                          text-lg
                          font-semibold
                        "
                        style={{
                          color:
                            "var(--text)",
                        }}
                      >
                        Data Collection
                      </h3>


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
                        Manage how StudyCopilot uses your learning data.
                      </p>


                    </div>





                    <div
                      className="
                        rounded-2xl
                        border
                        p-6
                      "
                      style={{
                        background:
                          "var(--surfaceHover)",

                        borderColor:
                          "var(--border)",
                      }}
                    >

                      <h3
                        className="
                          text-lg
                          font-semibold
                        "
                        style={{
                          color:
                            "var(--text)",
                        }}
                      >
                        Account Privacy
                      </h3>


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
export default function Settings(){

  return (
    <SettingsContent />
  );

}