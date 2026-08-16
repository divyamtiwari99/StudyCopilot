import { Lock, LogOut, Shield, ShieldCheck, Smartphone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import SectionHeader from "./SectionHeader";
import SettingCard from "./SettingCard";
import { useAuthStore } from "@/store/auth.store";

export default function SecuritySection() {
  const logout = useAuthStore((state) => state.logout);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setLoggingOut(true);
      await logout();
      toast.success("Signed out successfully.");
    } catch {
      toast.error("Unable to sign out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-3xl">
      <SectionHeader
        eyebrow="SECURITY"
        title="Account Security"
        description="Review the security controls that are actually available to this frontend. Unsupported controls stay disabled instead of showing fake account data."
        icon={<ShieldCheck size={26} className="text-emerald-400" />}
      />

      <div className="grid gap-5 p-6 lg:grid-cols-2">
        <SettingCard
          title="Password"
          description="Password changes require a dedicated account-security endpoint."
          icon={<Lock size={20} className="text-emerald-400" />}
          value={
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-[var(--text)]">
                  Managed by your account provider
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  No password-change API is exposed by the current frontend contract.
                </p>
              </div>
              <span className="shrink-0 rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--muted)]">
                Unavailable
              </span>
            </div>
          }
        />

        <SettingCard
          title="Two-Factor Authentication"
          description="Require an additional verification step when signing in."
          icon={<Shield size={20} className="text-cyan-400" />}
          value={
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-[var(--text)]">Not configured</p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Enablement requires a real 2FA setup and verification API.
                </p>
              </div>
              <button
                type="button"
                disabled
                title="Two-factor authentication requires the account security API."
                className="cursor-not-allowed rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--muted)] opacity-60"
              >
                Configure
              </button>
            </div>
          }
        />

        <SettingCard
          title="Current Session"
          description="Sign out this browser session using the existing authentication flow."
          icon={<Smartphone size={20} className="text-violet-400" />}
          value={
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-[var(--text)]">This device</p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Sign out removes the stored access and refresh tokens.
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <LogOut size={16} />
                {loggingOut ? "Signing out..." : "Sign out"}
              </button>
            </div>
          }
        />

        <SettingCard
          title="Security Activity"
          description="Recent login and security events are not exposed by the current API contract."
          icon={<ShieldCheck size={20} className="text-emerald-400" />}
          value={
            <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surfaceHover)] p-5">
              <p className="font-semibold text-[var(--text)]">No activity feed available</p>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                Once the security-events endpoint exists, this area can show real sessions, logins and account changes.
              </p>
            </div>
          }
        />
      </div>
    </section>
  );
}
