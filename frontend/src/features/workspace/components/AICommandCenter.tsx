import {
  Brain,
  FileText,
  GraduationCap,
  Sparkles,
} from "lucide-react";

import { useParams } from "react-router-dom";

import { toast } from "sonner";

import CommandCard from "./CommandCard";

import { useGenerateNotes } from "../hooks/useGenerateNotes";
import { useGenerateFlashcards } from "../hooks/useGenerateFlashcards";
import { useGenerateQuiz } from "../hooks/useGenerateQuiz";
import { useGenerateSummary } from "../hooks/useGenerateSummary";

import { useWorkspaceArtifacts } from "../hooks/useWorkspaceArtifacts";

interface Props {
  onOpenTab: (
    tab:
      | "notes"
      | "summary"
      | "flashcards"
      | "quiz"
  ) => void;
}

export default function AICommandCenter({
  onOpenTab,
}: Props) {
  const { contentId } =
    useParams();

  const artifacts =
    useWorkspaceArtifacts();

  const notesMutation =
    useGenerateNotes();

  const flashcardsMutation =
    useGenerateFlashcards();

  const quizMutation =
    useGenerateQuiz();

  const summaryMutation =
    useGenerateSummary();

  async function handleGenerateNotes() {
    if (!contentId) return;

    try {
      await notesMutation.mutateAsync(
        contentId
      );

      toast.success(
        artifacts.notes
          ? "Notes regenerated successfully!"
          : "Notes generated successfully!"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to generate notes."
      );
    }
  }

  async function handleGenerateSummary() {
    if (!contentId) return;

    try {
      await summaryMutation.mutateAsync(
        contentId
      );

      toast.success(
        artifacts.summary
          ? "Summary regenerated successfully!"
          : "Summary generated successfully!"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to generate summary."
      );
    }
  }

  async function handleGenerateFlashcards() {
    if (!contentId) return;

    try {
      await flashcardsMutation.mutateAsync(
        contentId
      );

      toast.success(
        artifacts.flashcards
          ? "Flashcards regenerated successfully!"
          : "Flashcards generated successfully!"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to generate flashcards."
      );
    }
  }

  async function handleGenerateQuiz() {
    if (!contentId) return;

    try {
      await quizMutation.mutateAsync(
        contentId
      );

      toast.success(
        artifacts.quiz
          ? "Quiz regenerated successfully!"
          : "Quiz generated successfully!"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to generate quiz."
      );
    }
  }

  return (
    <section className="space-y-6">

      <div>

        <h2 className="text-2xl font-bold text-white">
          AI Command Center
        </h2>

        <p className="mt-2 text-zinc-400">
          Generate premium learning resources
          from your uploaded document.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <CommandCard
          icon={FileText}
          title="Notes"
          description="Generate structured study notes."
          loading={notesMutation.isPending}
          generated={artifacts.notes}
          onClick={handleGenerateNotes}
          onOpen={() =>
            onOpenTab("notes")
          }
        />

        <CommandCard
          icon={Sparkles}
          title="Summary"
          description="Create a concise document summary."
          loading={summaryMutation.isPending}
          generated={artifacts.summary}
          onClick={
            handleGenerateSummary
          }
          onOpen={() =>
            onOpenTab("summary")
          }
        />

        <CommandCard
          icon={Brain}
          title="Flashcards"
          description="Generate AI flashcards for revision."
          loading={
            flashcardsMutation.isPending
          }
          generated={
            artifacts.flashcards
          }
          onClick={
            handleGenerateFlashcards
          }
          onOpen={() =>
            onOpenTab(
              "flashcards"
            )
          }
        />

        <CommandCard
          icon={GraduationCap}
          title="Quiz"
          description="Generate an exam-style quiz."
          loading={quizMutation.isPending}
          generated={artifacts.quiz}
          onClick={handleGenerateQuiz}
          onOpen={() =>
            onOpenTab("quiz")
          }
        />

      </div>

    </section>
  );
}