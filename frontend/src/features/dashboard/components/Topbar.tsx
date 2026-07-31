import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 bg-[#09090B] px-8">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        <Search size={18} className="text-zinc-500" />

        <input
          placeholder="Search..."
          className="bg-transparent text-white outline-none placeholder:text-zinc-500"
        />
      </div>

      <button className="rounded-xl border border-white/10 p-3 text-zinc-400 hover:text-white">
        <Bell size={20} />
      </button>
    </header>
  );
}