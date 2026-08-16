import { useParams } from "react-router-dom";

import {
  Brain,
  Loader2,
} from "lucide-react";

import {
  useKnowledgeGraph,
} from "@/features/knowledge-graph/hooks/useKnowledgeGraph";

import KnowledgeGraphViewer from "@/features/knowledge-graph/components/KnowledgeGraphViewer";

interface GraphNode {
  id: string;
  label: string;
  category: string;
  description: string;
}

interface GraphEdge {
  source: string;
  target: string;
  relationship: string;
}

interface KnowledgeGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export default function KnowledgeGraphPage() {
  const { contentId } =
    useParams();

  const {
    data,
    isLoading,
    isError,
  } =
    useKnowledgeGraph(contentId);

  if (isLoading) {
    return (
      <div
        className="
          flex
          h-96
          flex-col
          items-center
          justify-center
          gap-4
          rounded-3xl
          border
        "
        style={{
          borderColor:
            "var(--border)",

          background:
            "var(--surface)",

          boxShadow:
            "var(--shadow-card)",
        }}
      >
        <Loader2
          size={40}
          className="animate-spin"
          style={{
            color:
              "var(--accent-color)",
          }}
        />

        <p
          className="
            text-sm
            font-medium
          "
          style={{
            color:
              "var(--muted)",
          }}
        >
          Loading Knowledge Graph...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
          flex
          h-96
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          p-8
          text-center
        "
        style={{
          borderColor:
            "color-mix(in srgb,var(--danger) 20%,var(--border))",

          background:
            "color-mix(in srgb,var(--danger) 4%,var(--surface))",

          boxShadow:
            "var(--shadow-card)",
        }}
      >
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            border
          "
          style={{
            background:
              "color-mix(in srgb,var(--danger) 10%,transparent)",

            borderColor:
              "color-mix(in srgb,var(--danger) 20%,var(--border))",

            color:
              "var(--danger)",
          }}
        >
          <Brain size={32} />
        </div>

        <h2
          className="
            mt-5
            text-xl
            font-semibold
          "
          style={{
            color:
              "var(--text)",
          }}
        >
          Failed to load Knowledge Graph
        </h2>

        <p
          className="
            mt-2
            text-sm
          "
          style={{
            color:
              "var(--muted)",
          }}
        >
          Please try again.
        </p>
      </div>
    );
  }

  if (!data?.json) {
    return (
      <div
        className="
          flex
          h-96
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          border-dashed
          p-8
          text-center
        "
        style={{
          borderColor:
            "var(--border)",

          background:
            "var(--surface)",

          boxShadow:
            "var(--shadow-card)",
        }}
      >
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            border
          "
          style={{
            background:
              "color-mix(in srgb,var(--accent-color) 9%,transparent)",

            borderColor:
              "color-mix(in srgb,var(--accent-color) 18%,var(--border))",

            color:
              "var(--accent-color)",
          }}
        >
          <Brain size={32} />
        </div>

        <h2
          className="
            mt-5
            text-xl
            font-semibold
          "
          style={{
            color:
              "var(--text)",
          }}
        >
          No Knowledge Graph Yet
        </h2>

        <p
          className="
            mt-2
            text-sm
            leading-6
          "
          style={{
            color:
              "var(--muted)",
          }}
        >
          Generate a Knowledge Graph from
          the AI Command Center.
        </p>
      </div>
    );
  }

  const graph =
    data.json as KnowledgeGraphData;

  return (
    <KnowledgeGraphViewer
      graph={graph}
    />
  );
}