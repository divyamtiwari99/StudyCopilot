import AICommandCenter from "../components/workspace/AICommandCenter";
import LearningOverview from "../components/workspace/LearningOverview";
import WorkspaceHero from "../components/workspace/WorkspaceHero";
import RecentDocuments from "../components/workspace/RecentDocuments";
import { useDashboard } from "../features/dashboard/hooks/useDashboard";

export default function DashboardPage() {
  const dashboard = useDashboard();

  if (dashboard.isLoading) {
    return (
      <div className="space-y-8">

        <div className="h-[300px] animate-pulse rounded-[30px] bg-white/[0.04]" />

        <div className="h-[350px] animate-pulse rounded-[30px] bg-white/[0.04]" />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[180px] animate-pulse rounded-[28px] bg-white/[0.04]"
            />
          ))}

        </div>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      <WorkspaceHero dashboard={dashboard} />

      <AICommandCenter />

      <RecentDocuments
  documents={dashboard.recentDocuments}
/>

<LearningOverview
  dashboard={dashboard}
/>

    </div>
  );
}