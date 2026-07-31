import DashboardLayout from "../components/DashboardLayout";
import UploadZone from "../components/UploadZone";

export default function DashboardHome() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-zinc-400">
            Upload a document and start learning with AI.
          </p>
        </div>

        <UploadZone />
      </div>
    </DashboardLayout>
  );
}