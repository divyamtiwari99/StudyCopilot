import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  FileText,
  MessageSquare,
  NotebookPen,
  Brain,
  GraduationCap,
  Calendar,
  HardDrive,
} from "lucide-react";

import ChatWindow from "@/features/workspace/components/ChatWindow";
import AICommandCenter from "@/features/workspace/components/AICommandCenter";

import NotesPage from "./NotesPage";
import FlashcardsPage from "./FlashcardsPage";
import QuizPage from "./QuizPage";

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
    id: "flashcards",
    label: "Flashcards",
    icon: Brain,
  },
  {
    id: "quiz",
    label: "Quiz",
    icon: GraduationCap,
  },
] as const;

type Tab = (typeof tabs)[number]["id"];

export default function WorkspacePage() {
  const { contentId } = useParams();

  const [activeTab, setActiveTab] =
    useState<Tab>("chat");

  const {
    data: document,
    isLoading,
  } = useDocument(contentId);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">

        <div className="flex items-start gap-6">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">

            <FileText size={30} />

          </div>

          <div className="flex-1">

            <h1 className="text-3xl font-bold text-white">

              {isLoading
                ? "Loading..."
                : document?.originalName ??
                  "AI Workspace"}

            </h1>

            <div className="mt-4 flex flex-wrap gap-6 text-sm text-zinc-400">

              <div className="flex items-center gap-2">

                <HardDrive size={16} />

                {document
                  ? `${(
                      document.size /
                      1024 /
                      1024
                    ).toFixed(2)} MB`
                  : "--"}

              </div>

              <div className="flex items-center gap-2">

                <Calendar size={16} />

                {document
                  ? new Date(
                      document.createdAt
                    ).toLocaleDateString()
                  : "--"}

              </div>

              <div className="flex items-center gap-2">

                <div
                  className={`h-2 w-2 rounded-full ${
                    document?.status === "ready"
                      ? "bg-emerald-400"
                      : document?.status ===
                          "processing"
                        ? "bg-yellow-400"
                        : "bg-red-400"
                  }`}
                />

                {document?.status ??
                  "--"}

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* AI Command Center */}

      <AICommandCenter />

      {/* Tabs */}

      <div className="flex flex-wrap gap-3">

        {tabs.map((tab) => {

          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(tab.id)
              }
              className={`flex items-center gap-2 rounded-2xl px-5 py-3 font-medium transition ${
                activeTab === tab.id
                  ? "bg-cyan-500 text-white"
                  : "border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10"
              }`}
            >
              <Icon size={18} />

              {tab.label}

            </button>
          );

        })}

      </div>

      {/* Content */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">

        {activeTab === "chat" && (
          <ChatWindow />
        )}

        {activeTab === "notes" && (
          <NotesPage />
        )}

        {activeTab === "flashcards" && (
          <FlashcardsPage />
        )}

        {activeTab === "quiz" && (
          <QuizPage />
        )}

      </div>

    </div>
  );
}