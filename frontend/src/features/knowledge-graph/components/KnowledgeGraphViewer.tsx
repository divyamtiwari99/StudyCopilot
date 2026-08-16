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

const dagreGraph =
  new dagre.graphlib.Graph();

dagreGraph.setDefaultEdgeLabel(
  () => ({}),
);

const nodeWidth = 240;
const nodeHeight = 120;

function getCategoryColor(
  category: string,
) {
  switch (category.toLowerCase()) {
    case "concept":
      return "var(--accent-color)";

    case "definition":
      return "color-mix(in srgb,var(--accent-color) 70%,white)";

    case "formula":
      return "#22c55e";

    case "example":
      return "#f59e0b";

    default:
      return "var(--accent-color)";
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
    dagreGraph.setNode(
      node.id,
      {
        width: nodeWidth,
        height: nodeHeight,
      },
    );
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
  const [
    selectedNode,
    setSelectedNode,
  ] = useState<GraphNode | null>(
    null,
  );

  const reactFlowEdges =
    useMemo<Edge[]>(
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
            stroke:
              "var(--accent-color)",

            strokeWidth: 2,
          },

          labelStyle: {
            fill: "var(--muted)",
            fontSize: 12,
          },
        })),
      [graph.edges],
    );

  const reactFlowNodes =
    useMemo<Node[]>(() => {
      const nodes: Node[] =
        graph.nodes.map((node) => ({
          id: node.id,

          data: {
            label: (
              <div className="space-y-2">
                <div
                  className="
                    font-semibold
                  "
                  style={{
                    color:
                      "var(--text)",
                  }}
                >
                  {node.label}
                </div>

                <div
                  className="
                    inline-flex
                    rounded-full
                    px-2
                    py-1
                    text-xs
                    font-medium
                  "
                  style={{
                    backgroundColor:
                      `${getCategoryColor(
                        node.category,
                      )}22`,

                    color:
                      getCategoryColor(
                        node.category,
                      ),
                  }}
                >
                  {node.category}
                </div>

                {node.description && (
                  <p
                    className="
                      line-clamp-3
                      text-xs
                    "
                    style={{
                      color:
                        "var(--muted)",
                    }}
                  >
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
                ? "2px solid var(--accent-color)"
                : "1px solid var(--border)",

            background:
              "var(--surface)",

            color:
              "var(--text)",

            boxShadow:
              selectedNode?.id ===
              node.id
                ? "0 0 30px color-mix(in srgb,var(--accent-color) 35%,transparent)"
                : "0 8px 30px rgb(0 0 0 / 0.08)",
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

  const handleNodeClick:
    NodeMouseHandler =
    (_, node) => {
      const original =
        graph.nodes.find(
          (item) =>
            item.id === node.id,
        );

      setSelectedNode(
        original ?? null,
      );
    };

  return (
    <div
      className="
        flex
        h-[650px]
        w-full
        overflow-hidden
        rounded-3xl
        border
      "
      style={{
        borderColor:
          "var(--border)",
        backgroundColor:
          "var(--surface)",
      }}
    >
      <div
        className="
          h-full
          min-w-0
          flex-1
        "
      >
        <ReactFlow
          fitView
          nodes={reactFlowNodes}
          edges={reactFlowEdges}
          onNodeClick={
            handleNodeClick
          }
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
            variant={
              BackgroundVariant.Dots
            }
            gap={24}
            size={1.5}
            color="var(--border)"
          />
        </ReactFlow>
      </div>

      <div
        className="
          w-[320px]
          shrink-0
          border-l
          p-6
        "
        style={{
          borderColor:
            "var(--border)",
          backgroundColor:
            "var(--surface)",
        }}
      >
        <NodeDetailsPanel
          node={selectedNode}
        />
      </div>
    </div>
  );
}