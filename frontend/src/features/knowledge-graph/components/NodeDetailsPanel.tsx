interface GraphNode {
  id: string;
  label: string;
  category: string;
  description: string;
}

interface Props {
  node: GraphNode | null;
}

export default function NodeDetailsPanel({
  node,
}: Props) {
  return (
    <aside className="h-full w-[340px] border-l border-white/10 bg-[#0b1220] p-6">

      {!node ? (
        <div className="flex h-full items-center justify-center text-center text-zinc-500">
          Select a node to view its details.
        </div>
      ) : (
        <div className="space-y-6">

          <div>

            <h2 className="text-2xl font-bold text-white">
              {node.label}
            </h2>

            <span className="mt-3 inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400">
              {node.category}
            </span>

          </div>

          <div>

            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Description
            </h3>

            <p className="leading-7 text-zinc-300">
              {node.description ||
                "No description available."}
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

            <h3 className="mb-2 text-sm font-semibold text-white">
              Node ID
            </h3>

            <p className="break-all text-xs text-zinc-400">
              {node.id}
            </p>

          </div>

        </div>
      )}

    </aside>
  );
}