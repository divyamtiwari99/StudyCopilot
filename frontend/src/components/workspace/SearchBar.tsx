import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-lg">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
      />

      <input
        type="text"
        placeholder="Search documents, notes, quizzes..."
        className="h-12 w-full rounded-2xl border border-slate-800 bg-slate-900 pl-12 pr-4 text-white outline-none transition-all focus:border-indigo-500"
      />
    </div>
  );
}