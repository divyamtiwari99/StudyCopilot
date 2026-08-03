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
      <div className="flex h-96 items-center justify-center text-zinc-400">
        Loading Roadmap...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-96 flex-col items-center justify-center">
        <Map
          size={48}
          className="mb-4 text-red-400"
        />

        <h2 className="text-xl font-semibold text-white">
          Failed to load Roadmap
        </h2>
      </div>
    );
  }

  if (!data?.json) {
    return (
      <div className="flex h-96 flex-col items-center justify-center">
        <Map
          size={48}
          className="mb-4 text-zinc-500"
        />

        <h2 className="text-xl font-semibold text-white">
          No Roadmap Yet
        </h2>

        <p className="mt-2 text-zinc-400">
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