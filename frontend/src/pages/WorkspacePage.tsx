import { useEffect, useRef, useState } from "react";

import {
  useParams,
  useSearchParams,
} from "react-router-dom";

import {
  FileText,
  MessageSquare,
  NotebookPen,
  Brain,
  GraduationCap,
  Calendar,
  HardDrive,
  Sparkles,
  Network,
  Route,
} from "lucide-react";

import RoadmapPage from "./RoadmapPage";
import NotesPage from "./NotesPage";
import SummaryPage from "./SummaryPage";
import FlashcardsPage from "./FlashcardsPage";
import QuizPage from "./QuizPage";
import KnowledgeGraphPage from "./KnowledgeGraphPage";

import ChatWindow from "@/features/workspace/components/ChatWindow";
import AICommandCenter from "@/features/workspace/components/AICommandCenter";

import { useDocument } from "@/features/dashboard/hooks/useDocument";

const tabs = [
  {
    id: "chat",
    label: "Chat",
    icon: MessageSquare,
  },
  {
    id: "notes",
    label: "Notes",
    icon: NotebookPen,
  },
  {
    id: "summary",
    label: "Summary",
    icon: Sparkles,
  },
  {
    id: "flashcards",
    label: "Flashcards",
    icon: Brain,
  },
  {
    id: "quiz",
    label: "Quiz",
    icon: GraduationCap,
  },
  {
    id: "knowledgeGraph",
    label: "Knowledge Graph",
    icon: Network,
  },
  {
    id: "roadmap",
    label: "Roadmap",
    icon: Route,
  },
] as const;

type Tab =
  (typeof tabs)[number]["id"];

export default function WorkspacePage() {
  const { contentId } =
    useParams();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const tabFromUrl = searchParams.get("tab");
  const initialTab: Tab =
    tabs.some((tab) => tab.id === tabFromUrl)
      ? (tabFromUrl as Tab)
      : "chat";

  const [activeTab, setActiveTab] =
    useState<Tab>(initialTab);

  useEffect(() => {
    const nextTab =
      tabs.some((tab) => tab.id === tabFromUrl)
        ? (tabFromUrl as Tab)
        : "chat";

    setActiveTab(nextTab);
  }, [tabFromUrl]);

  const contentRef =
    useRef<HTMLDivElement | null>(null);

  const {
    data: document,
    isLoading,
  } = useDocument(contentId);

  function handleOpenTab(tab: Tab) {
    setActiveTab(tab);
    setSearchParams({ tab }, { replace: true });

    setTimeout(() => {
      if (!contentRef.current) {
        return;
      }

      const top =
        contentRef.current.getBoundingClientRect()
          .top +
        window.scrollY -
        20;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }, 50);
  }

  return (
    <div className="space-y-6">
      {/* Document Header */}

      <div
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          p-8
          backdrop-blur-xl
          transition-all
          duration-300
        "
        style={{
          background:
            "var(--surface)",

          borderColor:
            "var(--border)",

          boxShadow:
            "var(--shadow-card)",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.borderColor =
            "color-mix(in srgb,var(--accent-color) 22%,var(--border))";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.borderColor =
            "var(--border)";
        }}
      >
        {/* Ambient glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-56
            w-56
            rounded-full
            opacity-0
            blur-3xl
            transition-opacity
            duration-500
            group-hover:opacity-20
          "
          style={{
            background:
              "var(--accent-color)",
          }}
        />

        <div className="relative z-10 flex items-start gap-6">
          {/* Document Icon */}

          <div
            className="
              flex
              h-16
              w-16
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              transition-all
              duration-300
              group-hover:scale-105
            "
            style={{
              background:
                "color-mix(in srgb,var(--accent-color) 10%,transparent)",

              borderColor:
                "color-mix(in srgb,var(--accent-color) 20%,var(--border))",

              color:
                "var(--accent-color)",

              boxShadow:
                "0 10px 30px color-mix(in srgb,var(--accent-color) 8%,transparent)",
            }}
          >
            <FileText
              size={30}
              strokeWidth={1.8}
            />
          </div>

          {/* Document Info */}

          <div className="min-w-0 flex-1">
            <h1
              className="
                truncate
                text-3xl
                font-bold
                tracking-tight
              "
              style={{
                color:
                  "var(--text)",
              }}
            >
              {isLoading
                ? "Loading..."
                : document?.title ||
                  document?.originalName ||
                  "AI Workspace"}
            </h1>

            <div
              className="
                mt-4
                flex
                flex-wrap
                items-center
                gap-x-6
                gap-y-3
                text-sm
              "
              style={{
                color:
                  "var(--muted)",
              }}
            >
              {/* Size */}

              <div className="flex items-center gap-2">
                <HardDrive
                  size={16}
                  strokeWidth={1.8}
                />

                <span>
                  {document
                    ? `${(
                        document.size /
                        1024 /
                        1024
                      ).toFixed(2)} MB`
                    : "--"}
                </span>
              </div>

              {/* Date */}

              <div className="flex items-center gap-2">
                <Calendar
                  size={16}
                  strokeWidth={1.8}
                />

                <span>
                  {document
                    ? new Date(
                        document.createdAt,
                      ).toLocaleDateString()
                    : "--"}
                </span>
              </div>

              {/* Status */}

              <div className="flex items-center gap-2">
                <span
                  className="
                    h-2
                    w-2
                    shrink-0
                    rounded-full
                  "
                  style={{
                    backgroundColor:
                      document?.status ===
                      "ready"
                        ? "var(--success)"
                        : document?.status ===
                          "processing"
                        ? "var(--warning)"
                        : "var(--danger)",

                    boxShadow:
                      document?.status ===
                      "ready"
                        ? "0 0 8px color-mix(in srgb,var(--success) 55%,transparent)"
                        : document?.status ===
                          "processing"
                        ? "0 0 8px color-mix(in srgb,var(--warning) 55%,transparent)"
                        : "0 0 8px color-mix(in srgb,var(--danger) 55%,transparent)",
                  }}
                />

                <span className="capitalize">
                  {document?.status ?? "--"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Command Center */}

      <AICommandCenter
        onOpenTab={handleOpenTab}
      />

      {/* Tabs */}

      <div
        className="
          flex
          flex-wrap
          gap-2
          rounded-3xl
          border
          p-2
        "
        style={{
          background:
            "color-mix(in srgb,var(--surface) 92%,transparent)",

          borderColor:
            "var(--border)",

          boxShadow:
            "var(--shadow-card)",
        }}
      >
        {tabs.map((tab) => {
          const Icon =
            tab.icon;

          const active =
            activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() =>
                handleOpenTab(tab.id)
              }
              className="
                group/tab
                relative
                flex
                items-center
                gap-2
                rounded-2xl
                border
                px-4
                py-2.5
                text-sm
                font-medium
                transition-all
                duration-200
                active:scale-[0.98]
              "
              style={{
                backgroundColor:
                  active
                    ? "var(--accent-color)"
                    : "transparent",

                color:
                  active
                    ? "#ffffff"
                    : "var(--muted)",

                borderColor:
                  active
                    ? "var(--accent-color)"
                    : "transparent",

                boxShadow:
                  active
                    ? "0 8px 22px color-mix(in srgb,var(--accent-color) 20%,transparent)"
                    : "none",
              }}
              onMouseEnter={(event) => {
                if (active) {
                  return;
                }

                event.currentTarget.style.backgroundColor =
                  "var(--surfaceHover)";

                event.currentTarget.style.color =
                  "var(--text)";

                event.currentTarget.style.borderColor =
                  "var(--border)";
              }}
              onMouseLeave={(event) => {
                if (active) {
                  return;
                }

                event.currentTarget.style.backgroundColor =
                  "transparent";

                event.currentTarget.style.color =
                  "var(--muted)";

                event.currentTarget.style.borderColor =
                  "transparent";
              }}
            >
              <Icon
                size={17}
                strokeWidth={1.9}
                className="
                  transition-transform
                  duration-200
                  group-hover/tab:scale-105
                "
              />

              <span>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}

      <div
        ref={contentRef}
        className="
          overflow-hidden
          rounded-3xl
          border
          p-8
          backdrop-blur-xl
        "
        style={{
          background:
            "var(--surface)",

          borderColor:
            "var(--border)",

          boxShadow:
            "var(--shadow-card)",
        }}
      >
        {activeTab === "chat" && (
          <ChatWindow />
        )}

        {activeTab === "notes" && (
          <NotesPage />
        )}

        {activeTab === "summary" && (
          <SummaryPage />
        )}

        {activeTab === "flashcards" && (
          <FlashcardsPage />
        )}

        {activeTab === "quiz" && (
          <QuizPage />
        )}

        {activeTab === "knowledgeGraph" && (
          <KnowledgeGraphPage />
        )}

        {activeTab === "roadmap" && (
          <RoadmapPage />
        )}
      </div>
    </div>
  );
}