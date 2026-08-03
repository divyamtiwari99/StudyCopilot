import { useMemo, useState } from "react";

import dagre from "@dagrejs/dagre";

import {
  Background,
  BackgroundVariant,
  MarkerType,
  ReactFlow,
  type Edge,
  type Node,
  type NodeMouseHandler,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import NodeDetailsPanel from "./NodeDetailsPanel";

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

interface Props {
  graph: {
    nodes: GraphNode[];
    edges: GraphEdge[];
  };
}

const dagreGraph = new dagre.graphlib.Graph();

dagreGraph.setDefaultEdgeLabel(
  () => ({})
);

const nodeWidth = 240;
const nodeHeight = 120;

function getCategoryColor(
  category: string,
) {
  switch (
    category.toLowerCase()
  ) {
    case "concept":
      return "#06b6d4";

    case "definition":
      return "#8b5cf6";

    case "formula":
      return "#22c55e";

    case "example":
      return "#f59e0b";

    default:
      return "#3b82f6";
  }
}

function layout(
  nodes: Node[],
  edges: Edge[],
) {
  dagreGraph.setGraph({
    rankdir: "LR",
    nodesep: 70,
    ranksep: 120,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(
      edge.source,
      edge.target,
    );
  });

  dagre.layout(dagreGraph);

  return nodes.map((node) => {
    const position =
      dagreGraph.node(node.id);

    return {
      ...node,
      position: {
        x:
          position.x -
          nodeWidth / 2,
        y:
          position.y -
          nodeHeight / 2,
      },
    };
  });
}

export default function KnowledgeGraphViewer({
  graph,
}: Props) {
  const [selectedNode, setSelectedNode] =
    useState<GraphNode | null>(null);

  const reactFlowEdges = useMemo<Edge[]>(
    () =>
      graph.edges.map((edge) => ({
        id: `${edge.source}-${edge.target}`,

        source: edge.source,

        target: edge.target,

        label: edge.relationship,

        type: "smoothstep",

        animated: true,

        markerEnd: {
          type: MarkerType.ArrowClosed,
        },

        style: {
          stroke: "#38bdf8",

          strokeWidth: 2,
        },

        labelStyle: {
          fill: "#d4d4d8",

          fontSize: 12,
        },
      })),
    [graph.edges],
  );
  

  const reactFlowNodes = useMemo<Node[]>(() => {
      let nodes: Node[] =
        graph.nodes.map((node) => ({
          id: node.id,

          data: {
            label: (
              <div className="space-y-2">

                <div className="font-semibold text-white">
                  {node.label}
                </div>

                <div
                  className="inline-flex rounded-full px-2 py-1 text-xs font-medium"
                  style={{
                    background:
                      getCategoryColor(
                        node.category,
                      ) + "22",

                    color:
                      getCategoryColor(
                        node.category,
                      ),
                  }}
                >
                  {node.category}
                </div>

                {node.description && (
                  <p className="line-clamp-3 text-xs text-zinc-400">
                    {node.description}
                  </p>
                )}

              </div>
            ),
          },

          position: {
            x: 0,
            y: 0,
          },

          style: {
            width: nodeWidth,

            minHeight:
              nodeHeight,

            padding: 16,

            borderRadius: 18,

            border:
              selectedNode?.id ===
              node.id
                ? "2px solid #22d3ee"
                : "1px solid rgba(255,255,255,.08)",

            background:
              "#0b1220",

            color: "#fff",

            boxShadow:
              selectedNode?.id ===
              node.id
                ? "0 0 30px rgba(34,211,238,.35)"
                : "0 0 30px rgba(0,0,0,.25)",
          },
        }));

      return layout(
        nodes,
        reactFlowEdges,
      );
    }, [
      graph.nodes,
      selectedNode,
      reactFlowEdges,
    ]);

 

  const handleNodeClick: NodeMouseHandler =
    (_, node) => {
      const original =
        graph.nodes.find(
          (n) =>
            n.id === node.id,
        );

      setSelectedNode(
        original ?? null,
      );
    };

  return (
    <div className="flex h-[780px] overflow-hidden rounded-3xl border border-white/10 bg-[#060816]">

      <div className="flex-1">

        <ReactFlow
          fitView
          nodes={reactFlowNodes}
          edges={reactFlowEdges}
          onNodeClick={handleNodeClick}
          minZoom={0.25}
          maxZoom={2}
          fitViewOptions={{
            padding: 0.25,
          }}
          proOptions={{
            hideAttribution: true,
          }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={24}
            size={1.5}
          />
        </ReactFlow>

      </div>

      <NodeDetailsPanel
        node={selectedNode}
      />

    </div>
  );
}