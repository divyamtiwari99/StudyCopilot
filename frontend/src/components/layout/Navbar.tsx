import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 px-8">
      <div className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-2">
        <Search size={18} />
        <input
          placeholder="Search..."
          className="bg-transparent outline-none"
        />
      </div>

      <div className="flex items-center gap-6">
        <Bell />

        <UserCircle2 size={34} />
      </div>
    </header>
  );
}