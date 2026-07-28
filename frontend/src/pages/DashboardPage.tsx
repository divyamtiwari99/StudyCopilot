import RecentDocuments from "../components/dashboard/RecentDocuments";
import UploadCard from "../components/dashboard/UploadCard";
import LearningAnalytics from "../components/workspace/widgets/LearningAnalytics";
import WorkspaceHeader from "../components/workspace/WorkspaceHeader";
import ContinueLearning from "../components/workspace/widgets/ContinueLearning";
import AISuggestions from "../components/workspace/widgets/AISuggestions";
import ActivityTimeline from "../components/workspace/widgets/ActivityTimeline";



export default function DashboardPage() {
  return (
    <div className="space-y-8">

      <WorkspaceHeader />

      <ContinueLearning />

      <AISuggestions />

      <LearningAnalytics />

      <ActivityTimeline />

      <UploadCard />

      <RecentDocuments />

    </div>
  );
}