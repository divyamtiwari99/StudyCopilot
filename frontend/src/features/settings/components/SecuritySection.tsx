import {
  Laptop,
  Lock,
  Shield,
  ShieldCheck,
  Smartphone,
  UserCheck,
} from "lucide-react";

import SectionHeader from "./SectionHeader";
import SettingCard from "./SettingCard";
import SettingSwitch from "./SettingSwitch";


export default function SecuritySection() {


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

        eyebrow="SECURITY"

        title="Account Security"

        description="
        Protect your StudyCopilot account
        with advanced security controls.
        "

        icon={

          <ShieldCheck

            size={26}

            className="text-emerald-400"

          />

        }

      />



      <div className="
        grid
        gap-5
        p-6
        lg:grid-cols-2
      ">



        <SettingCard

          title="Password"

          description="
          Keep your account protected
          with a strong password.
          "

          icon={

            <Lock

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


                <p className="
                  text-base
                  font-semibold
                  text-white
                ">

                  Last changed 18 days ago

                </p>



                <p className="
                  mt-1
                  text-sm
                  text-slate-400
                ">

                  Recommended update every 90 days.

                </p>


              </div>



              <button

                type="button"

                className="
                  rounded-xl
                  border
                  border-white/10
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:border-emerald-500/20
                  hover:bg-emerald-500/10
                "

              >

                Change

              </button>


            </div>

          }

        />




        <SettingCard

          title="Two-Factor Authentication"

          description="
          Require a verification code
          when signing in.
          "

          icon={

            <Shield

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


                <p className="
                  text-base
                  font-semibold
                  text-white
                ">

                  Disabled

                </p>



                <p className="
                  mt-1
                  text-sm
                  text-slate-400
                ">

                  Add another layer of protection.

                </p>


              </div>



              <SettingSwitch

                enabled={false}

                onToggle={() => {}}

              />


            </div>

          }

        />
                <SettingCard

          title="Login Alerts"

          description="
          Receive alerts whenever
          a new device signs in.
          "

          icon={

            <Smartphone

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


                <p className="
                  text-base
                  font-semibold
                  text-white
                ">

                  Enabled

                </p>



                <p className="
                  mt-1
                  text-sm
                  text-slate-400
                ">

                  Email alerts for new logins.

                </p>


              </div>



              <SettingSwitch

                enabled

                onToggle={() => {}}

              />


            </div>

          }

        />




        <SettingCard

          title="Trusted Devices"

          description="
          Devices currently authorized
          to access your account.
          "

          icon={

            <Laptop

              size={20}

              className="text-cyan-400"

            />

          }


          value={

            <div className="space-y-3">


              <div className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-4
              ">


                <div>


                  <p className="
                    font-semibold
                    text-white
                  ">

                    Windows Desktop

                  </p>



                  <p className="
                    text-sm
                    text-slate-400
                  ">

                    Last active today

                  </p>


                </div>



                <UserCheck

                  size={18}

                  className="text-emerald-400"

                />


              </div>




              <div className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-4
              ">


                <div>


                  <p className="
                    font-semibold
                    text-white
                  ">

                    Android Phone

                  </p>



                  <p className="
                    text-sm
                    text-slate-400
                  ">

                    Last active yesterday

                  </p>


                </div>



                <UserCheck

                  size={18}

                  className="text-emerald-400"

                />


              </div>


            </div>

          }

        />




        <SettingCard

          title="Active Sessions"

          description="
          Devices currently signed
          into your account.
          "

          icon={

            <Laptop

              size={20}

              className="text-amber-400"

            />

          }


          value={

            <div className="space-y-3">


              <div className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-4
              ">


                <div>


                  <p className="
                    font-semibold
                    text-white
                  ">

                    Chrome • Windows

                  </p>



                  <p className="
                    text-sm
                    text-slate-400
                  ">

                    Current Session

                  </p>


                </div>



                <span className="
                  rounded-full
                  border
                  border-emerald-500/20
                  bg-emerald-500/10
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-emerald-300
                ">

                  Active

                </span>


              </div>




              <div className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-4
              ">


                <div>


                  <p className="
                    font-semibold
                    text-white
                  ">

                    Android App

                  </p>



                  <p className="
                    text-sm
                    text-slate-400
                  ">

                    2 hours ago

                  </p>


                </div>



                <button

                  type="button"

                  className="
                    rounded-xl
                    border
                    border-red-500/20
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-red-300
                    transition
                    hover:bg-red-500/10
                  "

                >

                  Sign Out

                </button>


              </div>


            </div>

          }

        />
                <SettingCard

          title="Recent Security Activity"

          description="
          Latest account security events.
          "

          icon={

            <ShieldCheck

              size={20}

              className="text-emerald-400"

            />

          }


          value={

            <div className="
              space-y-3
            ">


              <div className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-4
              ">


                <p className="
                  font-semibold
                  text-white
                ">

                  Successful Login

                </p>



                <p className="
                  mt-1
                  text-sm
                  text-slate-400
                ">

                  Windows Desktop • Today • 09:42 AM

                </p>


              </div>




              <div className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-4
              ">


                <p className="
                  font-semibold
                  text-white
                ">

                  Password Updated

                </p>



                <p className="
                  mt-1
                  text-sm
                  text-slate-400
                ">

                  18 days ago

                </p>


              </div>




              <div className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-4
              ">


                <p className="
                  font-semibold
                  text-white
                ">

                  AI Workspace Access

                </p>



                <p className="
                  mt-1
                  text-sm
                  text-slate-400
                ">

                  Verified Device

                </p>


              </div>


            </div>

          }

        />


      </div>




      <div className="
        border-t
        border-white/10
        px-6
        py-6
      ">


        <div className="
          flex
          flex-wrap
          items-center
          justify-between
          gap-5
          rounded-3xl
          border
          border-red-500/20
          bg-red-500/[0.05]
          p-5
        ">


          <div>


            <p className="
              text-base
              font-semibold
              text-white
            ">

              Sign out from all devices

            </p>



            <p className="
              mt-2
              max-w-2xl
              text-sm
              leading-6
              text-slate-400
            ">

              End every active session except your
              current device. You will need to sign
              in again on all other devices.

            </p>


          </div>




          <button

            type="button"

            className="
              rounded-xl
              border
              border-red-500/30
              bg-red-500
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-red-400
            "

          >

            Sign Out Everywhere

          </button>


        </div>


      </div>


    </section>

  );

}