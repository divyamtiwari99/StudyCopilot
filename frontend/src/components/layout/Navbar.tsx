import {
  Bell,
  Command,
  Search,
  Sparkles,
  UserCircle2,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 px-8 pt-6">

      <div className="flex h-20 items-center justify-between rounded-3xl border border-white/10 bg-white/[0.04] px-8 backdrop-blur-3xl">

        {/* Left */}

        <div>

          <h2 className="text-2xl font-bold text-white">
            Welcome Back 👋
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Continue building your knowledge today.
          </p>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          {/* Search */}

          <button className="group flex h-12 w-[250px] items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 transition hover:border-indigo-500/40">

            <div className="flex items-center gap-3">

              <Search
                size={18}
                className="text-slate-400"
              />

              <span className="text-sm text-slate-500">
                Search...
              </span>

            </div>

            <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-400">
              <Command size={12} />
              K
            </div>

          </button>

          {/* AI */}

          <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 transition hover:scale-105">

            <Sparkles
              className="text-indigo-400"
              size={20}
            />

          </button>

          {/* Notification */}

          <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] transition hover:scale-105">

            <Bell
              className="text-white"
              size={20}
            />

            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500" />

          </button>

          {/* Profile */}

          <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 transition hover:border-indigo-500/30">

            <UserCircle2
              className="text-indigo-400"
              size={34}
            />

            <div className="text-left">

              <p className="text-sm font-semibold text-white">
                Divyam
              </p>

              <p className="text-xs text-slate-400">
                Premium
              </p>

            </div>

          </button>

        </div>

      </div>

    </header>
  );
}