import SearchBar from "./SearchBar";
import QuickActions from "./QuickActions";

export default function WorkspaceHeader() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-4xl font-bold text-white">
          {greeting}
        </h1>

        <p className="mt-2 text-slate-400">
          Ready to continue learning?
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:items-end">
        <SearchBar />
        <QuickActions />
      </div>
    </div>
  );
}