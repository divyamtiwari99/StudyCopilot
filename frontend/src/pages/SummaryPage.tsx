import { useParams } from "react-router-dom";

import {
  FileText,
  Loader2,
} from "lucide-react";

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
      <div
        className="
          flex
          h-80
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
          size={40}
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
          Loading summary...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
          flex
          h-80
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
          <FileText size={28} />
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
          Failed to load summary
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

  if (!data?.markdown) {
    return (
      <div
        className="
          flex
          h-80
          flex-col
          items-center
          justify-center
          space-y-4
          rounded-3xl
          border
          border-dashed
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
          <FileText size={28} />
        </div>

        <div>
          <h2
            className="
              text-2xl
              font-semibold
            "
            style={{
              color:
                "var(--text)",
            }}
          >
            No Summary Found
          </h2>

          <p
            className="
              mt-2
              max-w-md
              text-sm
              leading-6
            "
            style={{
              color:
                "var(--muted)",
            }}
          >
            Generate a summary from the AI
            Command Center above.
          </p>
        </div>
      </div>
    );
  }

  return (
    <SummaryViewer
      markdown={data.markdown}
    />
  );
}