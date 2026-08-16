import { useParams } from "react-router-dom";

import { Map } from "lucide-react";

import { useRoadmap } from "@/features/roadmap/hooks/useRoadmap";

import RoadmapTimeline from "@/features/roadmap/components/RoadmapTimeline";

interface RoadmapTopic {
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: string;
  prerequisites: string[];
}

interface RoadmapPhase {
  title: string;
  description: string;
  topics: RoadmapTopic[];
}

interface RoadmapData {
  phases: RoadmapPhase[];
}

export default function RoadmapPage() {
  const { contentId } =
    useParams();

  const {
    data,
    isLoading,
    isError,
  } =
    useRoadmap(contentId);

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
        <div
          className="
            h-10
            w-10
            animate-spin
            rounded-full
            border-2
            border-transparent
          "
          style={{
            borderTopColor:
              "var(--accent-color)",

            borderRightColor:
              "color-mix(in srgb,var(--accent-color) 35%,transparent)",
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
          Loading Roadmap...
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
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            border
          "
          style={{
            background:
              "color-mix(in srgb,var(--danger) 9%,transparent)",

            borderColor:
              "color-mix(in srgb,var(--danger) 20%,var(--border))",

            color:
              "var(--danger)",
          }}
        >
          <Map size={28} />
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
          Failed to load Roadmap
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
            h-14
            w-14
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
          <Map size={28} />
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
          No Roadmap Yet
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
          Generate a Learning Roadmap
          from AI Command Center.
        </p>
      </div>
    );
  }

  const roadmap =
    data.json as RoadmapData;

  return (
    <RoadmapTimeline
      roadmap={roadmap}
    />
  );
}