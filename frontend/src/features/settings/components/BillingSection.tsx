import { CreditCard, Download, HardDrive, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import SectionHeader from "./SectionHeader";
import SettingCard from "./SettingCard";
import { useSettingsContext } from "./SettingsContext";

function clampPercentage(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)));
}

export default function BillingSection() {
  const { settings, saving } = useSettingsContext();

  const plan = settings.user.plan || "Free";
  const storageTotal = Math.max(0, settings.storage.total);
  const storageUsed = Math.max(0, settings.storage.used);
  const storagePercentage = clampPercentage(
    storageTotal > 0 ? (storageUsed / storageTotal) * 100 : 0,
  );

  const features =
    plan.toLowerCase() === "premium"
      ? ["Unlimited documents", "Advanced AI reasoning", "Priority sync"]
      : plan.toLowerCase() === "pro"
        ? ["More documents", "Higher AI limits", "Faster processing"]
        : ["Basic storage", "Core AI tools", "Upgrade available"];

  return (
    <section className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-3xl">
      <SectionHeader
        eyebrow="BILLING"
        title="Plan & Payments"
        description="Review your current plan and workspace usage. Billing-provider actions appear here when the account API is connected."
        icon={<CreditCard size={26} className="text-cyan-400" />}
        action={
          <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            {saving ? "Saving..." : "Account Plan"}
          </span>
        }
      />

      <div className="grid gap-5 p-6 lg:grid-cols-2">
        <SettingCard
          title="Current Plan"
          description="Your active subscription tier reported by the account settings API."
          icon={<Sparkles size={20} className="text-violet-400" />}
          value={
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xl font-semibold text-[var(--text)]">{plan}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {plan.toLowerCase() === "free"
                      ? "Core StudyCopilot features are available on your current plan."
                      : "Your plan information is synced from your account settings."}
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Active
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--muted)]"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          }
        />

        <SettingCard
          title="Workspace Usage"
          description="Live storage information currently available from your settings data."
          icon={<TrendingUp size={20} className="text-emerald-400" />}
          value={
            <div className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-base font-semibold text-[var(--text)]">Storage</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {storageUsed.toFixed(2)} GB used of {storageTotal.toFixed(2)} GB
                  </p>
                </div>
                <p className="text-2xl font-black text-[var(--text)]">{storagePercentage}%</p>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-[var(--surfaceHover)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 transition-all duration-500"
                  style={{ width: `${storagePercentage}%` }}
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surfaceHover)] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Documents</p>
                  <p className="mt-2 text-lg font-semibold text-[var(--text)]">{settings.storage.documents}</p>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surfaceHover)] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Chats</p>
                  <p className="mt-2 text-lg font-semibold text-[var(--text)]">{settings.storage.chats}</p>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surfaceHover)] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Plan</p>
                  <p className="mt-2 text-lg font-semibold text-[var(--text)]">{plan}</p>
                </div>
              </div>
            </div>
          }
        />

        <SettingCard
          title="Billing History"
          description="Invoice history is not fabricated. It will appear here once the billing-provider API is available."
          icon={<HardDrive size={20} className="text-cyan-400" />}
          value={
            <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surfaceHover)] p-5">
              <p className="font-semibold text-[var(--text)]">No billing records available</p>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                Your current frontend contract exposes plan and workspace usage, but not invoices or payment transactions.
              </p>
            </div>
          }
        />
      </div>

      <div className="space-y-5 px-6 pb-6">
        <div className="rounded-3xl border border-cyan-500/10 bg-gradient-to-b from-cyan-500/[0.08] to-[color-mix(in_srgb,var(--surface)_98%,transparent)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">Billing Actions</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              disabled
              title="Upgrade requires a billing-provider API."
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white opacity-60"
            >
              <Sparkles size={16} />
              Upgrade Plan
            </button>

            <button
              type="button"
              disabled
              title="Invoice downloads require a billing-provider API."
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--muted)] opacity-60"
            >
              <Download size={16} />
              Download Invoice
            </button>
          </div>

          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
            Billing actions are intentionally disabled until the backend exposes a real subscription and invoice contract. This prevents fake payment states in production.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surfaceHover)] p-5">
            <ShieldCheck size={22} className="text-emerald-400" />
            <p className="mt-4 font-semibold text-[var(--text)]">Secure account data</p>
            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
              Payment details are not stored or invented by this frontend.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surfaceHover)] p-5">
            <CreditCard size={22} className="text-cyan-400" />
            <p className="mt-4 font-semibold text-[var(--text)]">Provider-ready</p>
            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
              The UI is ready to surface real billing data when the API contract is added.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
