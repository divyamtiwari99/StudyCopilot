import {
  BookOpen,
  BrainCircuit,
  Clock3,
  HardDrive,
} from "lucide-react";

import StatsCard from "../ui/StatsCard";

import type { DashboardStats } from "@/features/dashboard/hooks/useDashboard";


interface Props {
  dashboard: {
    stats: DashboardStats;
  };
}


export default function LearningOverview({
  dashboard,
}: Props) {

  const { stats } = dashboard;


  return (

    <section
      className="
        grid
        gap-5
        md:grid-cols-2
        xl:grid-cols-4
      "
    >

      <StatsCard
        title="Documents"
        value={stats.totalDocuments.toString()}
        subtitle="Uploaded"
        icon={BookOpen}
      />


      <StatsCard
        title="Ready"
        value={stats.readyDocuments.toString()}
        subtitle="Available for AI"
        icon={BrainCircuit}
      />


      <StatsCard
        title="Processing"
        value={stats.processingDocuments.toString()}
        subtitle="Currently indexing"
        icon={Clock3}
      />


      <StatsCard
        title="Storage"
        value={stats.totalStorageLabel}
        subtitle="Used"
        icon={HardDrive}
      />


    </section>

  );
}