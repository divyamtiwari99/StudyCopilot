import { useParams } from "react-router-dom";

import { useSummary } from "@/features/summary/hooks/useSummary";

import SummaryViewer from "@/features/summary/components/SummaryViewer";

export default function SummaryPage() {
  const { contentId } = useParams();

  const {
    data,
    isLoading,
    isError,
  } = useSummary(contentId);

  if (isLoading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <p className="text-zinc-400">
          Loading summary...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-80 items-center justify-center">
        <p className="text-red-400">
          Failed to load summary.
        </p>
      </div>
    );
  }

  if (!data?.markdown) {
    return (
      <div className="flex h-80 flex-col items-center justify-center space-y-4 rounded-3xl border border-dashed border-white/10">

        <h2 className="text-2xl font-semibold text-white">
          No Summary Found
        </h2>

        <p className="max-w-md text-center text-zinc-400">
          Generate a summary from the AI Command
          Center above.
        </p>

      </div>
    );
  }

  return (
    <SummaryViewer
      markdown={data.markdown}
    />
  );
}