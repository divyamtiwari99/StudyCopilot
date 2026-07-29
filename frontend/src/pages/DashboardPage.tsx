import AICommandCenter from "../components/workspace/AICommandCenter";
import LearningOverview from "../components/workspace/LearningOverview";
import WorkspaceHero from "../components/workspace/WorkspaceHero";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <WorkspaceHero />
      <AICommandCenter />
      <LearningOverview />
    </div>
  );
}