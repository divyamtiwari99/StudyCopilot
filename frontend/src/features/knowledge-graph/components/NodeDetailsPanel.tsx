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
    <aside
      className="
        h-full
        w-full
      "
    >
      {!node ? (
        <div
          className="
            flex
            h-full
            items-center
            justify-center
            text-center
          "
          style={{
            color:
              "var(--muted)",
          }}
        >
          Select a node to view its details.
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h2
              className="
                text-2xl
                font-bold
              "
              style={{
                color:
                  "var(--text)",
              }}
            >
              {node.label}
            </h2>

            <span
              className="
                mt-3
                inline-flex
                rounded-full
                px-3
                py-1
                text-sm
                font-medium
              "
              style={{
                backgroundColor:
                  "color-mix(in srgb,var(--accent-color) 10%,transparent)",

                color:
                  "var(--accent-color)",
              }}
            >
              {node.category}
            </span>
          </div>

          <div>
            <h3
              className="
                mb-2
                text-sm
                font-semibold
                uppercase
                tracking-wide
              "
              style={{
                color:
                  "var(--muted)",
              }}
            >
              Description
            </h3>

            <p
              className="
                leading-7
              "
              style={{
                color:
                  "var(--text)",
              }}
            >
              {node.description ||
                "No description available."}
            </p>
          </div>

          <div
            className="
              rounded-2xl
              border
              p-4
            "
            style={{
              borderColor:
                "var(--border)",

              backgroundColor:
                "var(--surfaceHover)",
            }}
          >
            <h3
              className="
                mb-2
                text-sm
                font-semibold
              "
              style={{
                color:
                  "var(--text)",
              }}
            >
              Node ID
            </h3>

            <p
              className="
                break-all
                text-xs
              "
              style={{
                color:
                  "var(--muted)",
              }}
            >
              {node.id}
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}