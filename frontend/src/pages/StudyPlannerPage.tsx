import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  Brain,
  Loader2,
} from "lucide-react";

import { toast } from "sonner";

import PlannerHero from "@/features/study-planner/components/PlannerHero";
import PlannerStats from "@/features/study-planner/components/PlannerStats";
import PlannerTimeline from "@/features/study-planner/components/PlannerTimeline";
import PlannerProgress from "@/features/study-planner/components/PlannerProgress";
import EmptyPlanner from "@/features/study-planner/components/EmptyPlanner";

import { useStudyPlanner } from "@/features/study-planner/hooks/useStudyPlanner";
import { useGenerateStudyPlanner } from "@/features/study-planner/hooks/useGenerateStudyPlanner";

export default function StudyPlannerPage() {
  const { contentId } =
    useParams();

  const {
    data,
    isLoading,
    isError,
  } = useStudyPlanner(contentId);

  const generatePlanner =
    useGenerateStudyPlanner();

  const [
    completedTasks,
    setCompletedTasks,
  ] = useState(0);

  const [
    totalTasks,
    setTotalTasks,
  ] = useState(0);

  async function handleGenerate() {
    if (!contentId) return;

    try {
      await generatePlanner.mutateAsync({
        contentId,
        regenerate: Boolean(data),
      });

      toast.success(
        data
          ? "Study Planner regenerated successfully!"
          : "Study Planner generated successfully!",
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to generate Study Planner.",
      );
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2
          size={42}
          className="animate-spin text-cyan-400"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center">
        <Brain
          size={54}
          className="mb-5 text-red-400"
        />

        <h2 className="text-2xl font-bold text-white">
          Failed to load Study Planner
        </h2>

        <p className="mt-3 text-zinc-400">
          Please try again.
        </p>
      </div>
    );
  }

  if (!data?.json) {
    return (
      <div className="space-y-8">
        <PlannerHero
          onGenerate={
            handleGenerate
          }
          loading={
            generatePlanner.isPending
          }
        />

        <PlannerStats />

        <EmptyPlanner
          onGenerate={
            handleGenerate
          }
          loading={
            generatePlanner.isPending
          }
        />
      </div>
    );
  }

  const planner =
    data.json as {
      overview?: {
        estimatedDays?: number;
        dailyStudyHours?: string;
        totalTopics?: number;
      };

      days?: {
        day: number;
        title: string;
        description?: string;
        tasks: {
          title: string;
          estimatedTime?: string;
        }[];
      }[];
    };

  return (
    <div className="space-y-8">
      <PlannerHero
        onGenerate={
          handleGenerate
        }
        loading={
          generatePlanner.isPending
        }
      />

      <PlannerStats
        estimatedDays={
          planner.overview
            ?.estimatedDays
        }
        dailyStudyHours={
          planner.overview
            ?.dailyStudyHours
        }
        totalTopics={
          planner.overview
            ?.totalTopics
        }
        progress={
          totalTasks === 0
            ? 0
            : Math.round(
                (completedTasks /
                  totalTasks) *
                  100,
              )
        }
      />

      <PlannerProgress
        completed={
          completedTasks
        }
        total={totalTasks}
      />

      <PlannerTimeline
        days={
          planner.days ?? []
        }
        onProgressChange={(
          completed,
          total,
        ) => {
          setCompletedTasks(
            completed,
          );

          setTotalTasks(total);
        }}
      />
    </div>
  );
}