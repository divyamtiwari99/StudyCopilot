import {
  Brain,
  FileText,
  GraduationCap,
  Sparkles,
} from "lucide-react";

import { useParams } from "react-router-dom";

import CommandCard from "./CommandCard";

import { useGenerateNotes } from "../hooks/useGenerateNotes";
import { useGenerateFlashcards } from "../hooks/useGenerateFlashcards";

export default function AICommandCenter() {
  const { contentId } = useParams();

  const notesMutation =
    useGenerateNotes();

  const flashcardsMutation =
    useGenerateFlashcards();

  async function handleGenerateNotes() {
    if (!contentId) return;

    try {
      await notesMutation.mutateAsync(
        contentId,
      );

      alert(
        "✅ Notes generated successfully!",
      );
    } catch (error) {
      console.error(error);

      alert(
        "❌ Failed to generate notes.",
      );
    }
  }

  async function handleGenerateFlashcards() {
    if (!contentId) return;

    try {
      await flashcardsMutation.mutateAsync(
        contentId,
      );

      alert(
        "✅ Flashcards generated successfully!",
      );
    } catch (error) {
      console.error(error);

      alert(
        "❌ Failed to generate flashcards.",
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
          loading={
            notesMutation.isPending
          }
          onClick={
            handleGenerateNotes
          }
        />

        <CommandCard
          icon={Sparkles}
          title="Summary"
          description="Create a concise document summary."
          onClick={() => {
            alert(
              "Coming Soon 🚀",
            );
          }}
        />

        <CommandCard
          icon={Brain}
          title="Flashcards"
          description="Generate AI flashcards for revision."
          loading={
            flashcardsMutation.isPending
          }
          onClick={
            handleGenerateFlashcards
          }
        />

        <CommandCard
          icon={GraduationCap}
          title="Quiz"
          description="Generate an exam-style quiz."
          onClick={() => {
            alert(
              "Coming Soon 🚀",
            );
          }}
        />

      </div>

    </section>
  );
}