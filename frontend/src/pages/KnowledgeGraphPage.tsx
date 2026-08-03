import { useParams } from "react-router-dom";

import { Brain } from "lucide-react";

import { useKnowledgeGraph } from "@/features/knowledge-graph/hooks/useKnowledgeGraph";

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
      <div className="flex h-96 items-center justify-center text-zinc-400">
        Loading Knowledge Graph...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-96 flex-col items-center justify-center">

        <Brain
          size={48}
          className="mb-4 text-red-400"
        />

        <h2 className="text-xl font-semibold text-white">
          Failed to load Knowledge Graph
        </h2>

      </div>
    );
  }

  if (!data?.json) {
    return (
      <div className="flex h-96 flex-col items-center justify-center">

        <Brain
          size={48}
          className="mb-4 text-zinc-500"
        />

        <h2 className="text-xl font-semibold text-white">
          No Knowledge Graph Yet
        </h2>

        <p className="mt-2 text-zinc-400">
          Generate a Knowledge Graph from
          AI Command Center.
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