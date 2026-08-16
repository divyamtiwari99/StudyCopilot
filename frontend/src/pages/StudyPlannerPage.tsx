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
  const { contentId } = useParams();

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
      <div
        className="
          flex
          h-[70vh]
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
          size={42}
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
          Loading Study Planner...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
          flex
          h-[70vh]
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
              "color-mix(in srgb,var(--danger) 9%,transparent)",

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
            text-2xl
            font-bold
          "
          style={{
            color:
              "var(--text)",
          }}
        >
          Failed to load Study Planner
        </h2>

        <p
          className="
            mt-3
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