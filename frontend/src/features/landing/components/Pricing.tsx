import { Check } from "lucide-react";

import Section from "../../../components/ui/Section";
import SectionHeading from "../../../components/ui/SectionHeading";

const plans = [
  {
    name: "Free",
    price: "$0",
    featured: false,
    features: [
      "3 Documents",
      "Basic AI Chat",
      "Notes",
      "Limited Quiz",
    ],
  },
  {
    name: "Pro",
    price: "$9",
    featured: true,
    features: [
      "Unlimited Documents",
      "Unlimited AI Chat",
      "Knowledge Graph",
      "Unlimited Notes",
      "Unlimited Quiz",
      "Flashcards",
      "Priority AI",
    ],
  },
  {
    name: "Team",
    price: "$19",
    featured: false,
    features: [
      "Everything in Pro",
      "Shared Workspace",
      "Team Analytics",
      "Admin Dashboard",
    ],
  },
];

export default function Pricing() {
  return (
    <Section>
      <SectionHeading
        badge="Pricing"
        title="Simple"
        highlight="Pricing"
        description="Start free and upgrade whenever you're ready."
      />

      <div className="mt-20 grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-[32px] border p-8 transition duration-300 ${
              plan.featured
                ? "border-violet-500 bg-violet-500/10 scale-105"
                : "border-white/10 bg-white/[0.04]"
            }`}
          >
            {plan.featured && (
              <div className="mb-6 inline-flex rounded-full bg-violet-600 px-4 py-1 text-sm font-medium text-white">
                Most Popular
              </div>
            )}

            <h3 className="text-3xl font-bold text-white">
              {plan.name}
            </h3>

            <div className="mt-4 flex items-end gap-2">
              <span className="text-5xl font-bold text-white">
                {plan.price}
              </span>

              <span className="pb-1 text-zinc-400">
                /month
              </span>
            </div>

            <div className="mt-8 space-y-4">
              {plan.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <Check className="h-5 w-5 text-violet-400" />

                  <span className="text-zinc-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <button
              className={`mt-10 w-full rounded-2xl py-4 font-medium transition ${
                plan.featured
                  ? "bg-violet-600 text-white hover:bg-violet-500"
                  : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}