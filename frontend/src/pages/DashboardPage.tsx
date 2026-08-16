import AICommandCenter from "../components/workspace/AICommandCenter";
import LearningOverview from "../components/workspace/LearningOverview";
import WorkspaceHero from "../components/workspace/WorkspaceHero";
import RecentDocuments from "../components/workspace/RecentDocuments";

import { useDashboard } from "../features/dashboard/hooks/useDashboard";

export default function DashboardPage() {
  const dashboard =
    useDashboard();

  if (dashboard.isLoading) {
    return (
      <div
        className="
          space-y-8
        "
        aria-busy="true"
        aria-label="Loading dashboard"
      >
        {/* Hero Skeleton */}

        <div
          className="
            relative
            h-[280px]
            overflow-hidden
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
          <div
            className="
              absolute
              inset-0
              animate-pulse
            "
            style={{
              background:
                "color-mix(in srgb,var(--surfaceHover) 70%,transparent)",
            }}
          />

          <div
            className="
              absolute
              left-8
              top-8
              h-8
              w-40
              animate-pulse
              rounded-xl
            "
            style={{
              background:
                "color-mix(in srgb,var(--muted) 12%,transparent)",
            }}
          />

          <div
            className="
              absolute
              left-8
              top-20
              h-10
              w-2/3
              max-w-xl
              animate-pulse
              rounded-xl
            "
            style={{
              background:
                "color-mix(in srgb,var(--muted) 12%,transparent)",
            }}
          />

          <div
            className="
              absolute
              left-8
              top-36
              h-4
              w-1/2
              max-w-md
              animate-pulse
              rounded-lg
            "
            style={{
              background:
                "color-mix(in srgb,var(--muted) 10%,transparent)",
            }}
          />
        </div>

        {/* Overview Skeletons */}

        <div
          className="
            grid
            gap-5
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <div
              key={index}
              className="
                relative
                h-[150px]
                overflow-hidden
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
              <div
                className="
                  absolute
                  inset-0
                  animate-pulse
                "
                style={{
                  background:
                    "color-mix(in srgb,var(--surfaceHover) 65%,transparent)",
                }}
              />

              <div
                className="
                  absolute
                  left-5
                  top-5
                  h-10
                  w-10
                  animate-pulse
                  rounded-xl
                "
                style={{
                  background:
                    "color-mix(in srgb,var(--muted) 10%,transparent)",
                }}
              />

              <div
                className="
                  absolute
                  bottom-7
                  left-5
                  h-5
                  w-24
                  animate-pulse
                  rounded-lg
                "
                style={{
                  background:
                    "color-mix(in srgb,var(--muted) 10%,transparent)",
                }}
              />
            </div>
          ))}
        </div>

        {/* AI Command Center Skeleton */}

        <div
          className="
            relative
            h-[350px]
            overflow-hidden
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
          <div
            className="
              absolute
              inset-0
              animate-pulse
            "
            style={{
              background:
                "color-mix(in srgb,var(--surfaceHover) 65%,transparent)",
            }}
          />

          <div
            className="
              absolute
              left-8
              top-8
              h-8
              w-52
              animate-pulse
              rounded-xl
            "
            style={{
              background:
                "color-mix(in srgb,var(--muted) 12%,transparent)",
            }}
          />

          <div
            className="
              absolute
              left-8
              top-20
              h-4
              w-96
              max-w-[70%]
              animate-pulse
              rounded-lg
            "
            style={{
              background:
                "color-mix(in srgb,var(--muted) 9%,transparent)",
            }}
          />

          <div
            className="
              absolute
              bottom-8
              left-8
              right-8
              grid
              gap-4
              md:grid-cols-3
            "
          >
            {Array.from({
              length: 3,
            }).map((_, index) => (
              <div
                key={index}
                className="
                  h-28
                  animate-pulse
                  rounded-2xl
                "
                style={{
                  background:
                    "color-mix(in srgb,var(--muted) 8%,transparent)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Recent Documents Skeleton */}

        <div
          className="
            relative
            h-[350px]
            overflow-hidden
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
          <div
            className="
              absolute
              inset-0
              animate-pulse
            "
            style={{
              background:
                "color-mix(in srgb,var(--surfaceHover) 60%,transparent)",
            }}
          />

          <div
            className="
              absolute
              left-8
              top-8
              h-7
              w-48
              animate-pulse
              rounded-xl
            "
            style={{
              background:
                "color-mix(in srgb,var(--muted) 10%,transparent)",
            }}
          />

          <div
            className="
              absolute
              left-8
              right-8
              top-20
              space-y-3
            "
          >
            {Array.from({
              length: 4,
            }).map((_, index) => (
              <div
                key={index}
                className="
                  h-14
                  animate-pulse
                  rounded-2xl
                "
                style={{
                  background:
                    "color-mix(in srgb,var(--muted) 7%,transparent)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        space-y-8
      "
    >
      <WorkspaceHero />

      <LearningOverview
        dashboard={dashboard}
      />

      <AICommandCenter />

      <RecentDocuments
        documents={
          dashboard.recentDocuments
        }
      />
    </div>
  );
}