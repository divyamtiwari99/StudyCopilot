import {
  Calendar,
  CreditCard,
  Download,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import SectionHeader from "./SectionHeader";
import SettingCard from "./SettingCard";
import { useSettingsContext } from "./SettingsContext";


type PlanTier =
  | "Free"
  | "Premium"
  | "Pro";



interface BillingHistoryItem {

  id: string;

  label: string;

  date: string;

  amount: string;

  status:
    | "Paid"
    | "Pending"
    | "Failed";

}



const billingHistory: BillingHistoryItem[] = [

  {
    id: "inv-1024",
    label: "Monthly Subscription",
    date: "Aug 01, 2026",
    amount: "$12.00",
    status: "Paid",
  },


  {
    id: "inv-1023",
    label: "AI Usage Add-on",
    date: "Jul 01, 2026",
    amount: "$4.50",
    status: "Paid",
  },


  {
    id: "inv-1022",
    label: "Monthly Subscription",
    date: "Jun 01, 2026",
    amount: "$12.00",
    status: "Paid",
  },

];



function statusStyles(
  status: BillingHistoryItem["status"],
) {

  switch(status) {

    case "Paid":

      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";


    case "Pending":

      return "border-amber-500/20 bg-amber-500/10 text-amber-300";


    case "Failed":

      return "border-red-500/20 bg-red-500/10 text-red-300";


    default:

      return "border-white/10 bg-white/[0.04] text-slate-300";

  }

}



export default function BillingSection() {


  const {
    settings,
    saving,
  } = useSettingsContext();



  const plan =
    settings.user.plan as PlanTier;



  const planLabel =
    plan === "Premium"
      ? "Premium"
      : plan === "Pro"
        ? "Pro"
        : "Free";



  const renewalDate =
    "Sep 01, 2026";



  const usagePercent =
    68;



  const features =
    plan === "Premium"

      ? [
          "Unlimited documents",
          "Advanced AI reasoning",
          "Priority sync",
        ]

      : plan === "Pro"

        ? [
            "More documents",
            "Stronger AI limits",
            "Faster processing",
          ]

        : [
            "Basic storage",
            "Limited AI usage",
            "Upgrade available",
          ];



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

        eyebrow="BILLING"

        title="Plan & Payments"

        description="
        Review your subscription,
        usage and billing history.
        "

        icon={

          <CreditCard

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
              : "Billing Active"}

          </span>

        }

      />



      <div className="
        grid
        gap-5
        p-6
        lg:grid-cols-[1.05fr_0.95fr]
      ">


        <div className="
          grid
          gap-5
        ">


          <SettingCard

            title="Current Plan"

            description="
            Your active subscription tier.
            "

            icon={

              <Sparkles

                size={20}

                className="text-violet-400"

              />

            }


            value={

              <div className="
                space-y-4
              ">


                <div className="
                  flex
                  flex-wrap
                  items-center
                  justify-between
                  gap-4
                ">


                  <div>


                    <p className="
                      text-xl
                      font-semibold
                      text-white
                    ">

                      {planLabel}

                    </p>



                    <p className="
                      mt-1
                      text-sm
                      text-slate-400
                    ">

                      {plan === "Premium"

                        ? "All premium features are unlocked."

                        : "Upgrade to unlock the full StudyCopilot experience."

                      }

                    </p>


                  </div>
                  id="billing-part-2"
                    <div className="
                      rounded-2xl
                      border
                      border-emerald-500/20
                      bg-emerald-500/10
                      px-4
                      py-3
                    ">


                      <p className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-emerald-300
                      ">

                        {plan === "Premium"
                          ? "Best Value"
                          : "Active"}

                      </p>


                    </div>


                </div>




                <div className="
                  flex
                  flex-wrap
                  gap-3
                ">


                  {features.map(
                    (feature) => (

                      <span

                        key={feature}

                        className="
                          rounded-full
                          border
                          border-white/10
                          bg-white/[0.04]
                          px-3
                          py-2
                          text-sm
                          text-slate-300
                        "

                      >

                        {feature}

                      </span>

                    ),
                  )}


                </div>


              </div>

            }

          />




          <SettingCard

            title="Usage Summary"

            description="
            Track how much of your plan
            is currently used.
            "

            icon={

              <TrendingUp

                size={20}

                className="text-emerald-400"

              />

            }


            value={


              <div className="
                space-y-4
              ">


                <div className="
                  flex
                  items-end
                  justify-between
                  gap-4
                ">


                  <div>


                    <p className="
                      text-base
                      font-semibold
                      text-white
                    ">

                      Monthly Usage

                    </p>



                    <p className="
                      mt-1
                      text-sm
                      text-slate-400
                    ">

                      Documents, chats and AI activity.

                    </p>


                  </div>



                  <p className="
                    text-2xl
                    font-black
                    text-white
                  ">

                    {usagePercent}%

                  </p>


                </div>




                <div className="
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
                    "

                    style={{
                      width:
                        `${usagePercent}%`,
                    }}

                  />


                </div>




                <div className="
                  grid
                  gap-3
                  sm:grid-cols-3
                ">


                  <div className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-4
                  ">


                    <p className="
                      text-xs
                      uppercase
                      tracking-[0.18em]
                      text-slate-500
                    ">

                      Documents

                    </p>


                    <p className="
                      mt-2
                      text-lg
                      font-semibold
                      text-white
                    ">

                      {settings.storage.documents}

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
                      text-xs
                      uppercase
                      tracking-[0.18em]
                      text-slate-500
                    ">

                      Chats

                    </p>


                    <p className="
                      mt-2
                      text-lg
                      font-semibold
                      text-white
                    ">

                      {settings.storage.chats}

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
                      text-xs
                      uppercase
                      tracking-[0.18em]
                      text-slate-500
                    ">

                      Storage

                    </p>


                    <p className="
                      mt-2
                      text-lg
                      font-semibold
                      text-white
                    ">

                      {settings.storage.used}
                      {" / "}
                      {settings.storage.total}
                      {" GB"}

                    </p>


                  </div>


                </div>


              </div>


            }

          />




          <SettingCard

            title="Billing History"

            description="
            Recent invoices and payment records.
            "

            icon={

              <Calendar

                size={20}

                className="text-cyan-400"

              />

            }


            value={

              <div className="
                space-y-3
              ">


                {billingHistory.map(
                  (item) => (

                    <div

                      key={item.id}

                      className="
                        flex
                        flex-wrap
                        items-center
                        justify-between
                        gap-4
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        px-4
                        py-3
                      "

                    >


                      <div>


                        <p className="
                          font-semibold
                          text-white
                        ">

                          {item.label}

                        </p>



                        <p className="
                          mt-1
                          text-sm
                          text-slate-400
                        ">

                          {item.date}

                        </p>


                      </div>




                      <div className="
                        flex
                        items-center
                        gap-3
                      ">


                        <span className="
                          text-sm
                          font-semibold
                          text-white
                        ">

                          {item.amount}

                        </span>



                        <span className={`
                          rounded-full
                          border
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          ${statusStyles(item.status)}
                        `}>

                          {item.status}

                        </span>


                      </div>


                    </div>

                  ),
                )}


              </div>

            }

          />
          
        </div>




        <div className="
          space-y-5
        ">


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

              Renewal

            </p>




            <div className="
              mt-5
              flex
              items-center
              justify-between
              gap-4
            ">


              <div>


                <p className="
                  text-sm
                  text-slate-400
                ">

                  Next billing date

                </p>



                <p className="
                  mt-2
                  text-xl
                  font-semibold
                  text-white
                ">

                  {renewalDate}

                </p>


              </div>




              <div className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                p-3
              ">


                <ShieldCheck

                  size={22}

                  className="text-emerald-400"

                />


              </div>


            </div>




            <p className="
              mt-5
              text-sm
              leading-6
              text-slate-400
            ">

              Your plan renews automatically unless
              you change or cancel it before the
              renewal date.

            </p>




            <div className="
              mt-5
              flex
              flex-wrap
              gap-3
            ">


              <button

                type="button"

                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-500
                  via-sky-500
                  to-violet-500
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-cyan-500/20
                  transition
                  hover:-translate-y-0.5
                "

              >

                <Sparkles size={16} />

                Upgrade Plan

              </button>




              <button

                type="button"

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

                <Download size={16} />

                Download Invoice

              </button>


            </div>


          </div>





          <div className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            p-5
          ">


            <p className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.25em]
              text-slate-500
            ">

              Plan Comparison

            </p>




            <div className="
              mt-5
              space-y-3
            ">


              <div className="
                rounded-2xl
                border
                border-white/10
                bg-black/10
                p-4
              ">


                <p className="
                  text-sm
                  font-semibold
                  text-white
                ">

                  Free

                </p>



                <p className="
                  mt-2
                  text-sm
                  text-slate-400
                ">

                  Basic learning tools with limited
                  storage and AI access.

                </p>


              </div>





              <div className="
                rounded-2xl
                border
                border-violet-500/20
                bg-violet-500/10
                p-4
              ">


                <p className="
                  text-sm
                  font-semibold
                  text-white
                ">

                  Premium

                </p>



                <p className="
                  mt-2
                  text-sm
                  text-slate-400
                ">

                  Best for daily study, deeper AI
                  support and larger limits.

                </p>


              </div>


            </div>


          </div>


        </div>


      </div>


    </section>


  );

}