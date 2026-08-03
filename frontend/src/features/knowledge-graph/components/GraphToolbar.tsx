import {
  Download,
  Maximize2,
  Search,
} from "lucide-react";

interface Props {
  search: string;

  onSearch: (
    value: string,
  ) => void;

  onFullscreen: () => void;

  onExport: () => void;
}

export default function GraphToolbar({
  search,
  onSearch,
  onFullscreen,
  onExport,
}: Props) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-[#0b1220] px-6 py-4">

      <div className="relative w-80">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          value={search}
          onChange={(e) =>
            onSearch(
              e.target.value,
            )
          }
          placeholder="Search node..."
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white outline-none focus:border-cyan-500"
        />

      </div>

      <div className="flex gap-3">

        <button
          onClick={onExport}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition hover:bg-white/10"
        >
          <Download size={18} />
          Export
        </button>

        <button
          onClick={onFullscreen}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition hover:bg-white/10"
        >
          <Maximize2 size={18} />
          Fullscreen
        </button>

      </div>

    </div>
  );
}