import {
  Bell,
  Command,
  Search,
  Sparkles,
  UserCircle2,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 px-6 pt-4">

      <div className="flex h-16 items-center justify-between rounded-[24px] border border-white/10 bg-white/[0.04] px-6 backdrop-blur-3xl">

        {/* Left */}

        <div>

          <h2 className="text-xl font-bold tracking-tight text-white">
            Welcome Back 👋
          </h2>

          <p className="mt-0.5 text-xs text-slate-400">
            Continue your learning journey.
          </p>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          {/* Search */}

          <button className="group flex h-10 w-[220px] items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3 transition hover:border-indigo-500/40">

            <div className="flex items-center gap-2">

              <Search
                size={16}
                className="text-slate-400"
              />

              <span className="text-sm text-slate-500">
                Search...
              </span>

            </div>

            <div className="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-slate-400">

              <Command size={11} />

              K

            </div>

          </button>

          {/* AI */}

          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 transition hover:scale-105">

            <Sparkles
              size={18}
              className="text-indigo-400"
            />

          </button>

          {/* Notification */}

          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition hover:scale-105">

            <Bell
              size={18}
              className="text-white"
            />

            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />

          </button>

          {/* Profile */}

          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 transition hover:border-indigo-500/30">

            <UserCircle2
              size={30}
              className="text-indigo-400"
            />

            <div className="text-left leading-tight">

              <p className="text-sm font-semibold text-white">
                Divyam
              </p>

              <p className="text-[11px] text-slate-400">
                Premium
              </p>

            </div>

          </button>

        </div>

      </div>

    </header>
  );
}