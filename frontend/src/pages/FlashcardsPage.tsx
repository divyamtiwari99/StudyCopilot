import { useParams } from "react-router-dom";

import { Brain } from "lucide-react";

import { useFlashcards } from "@/features/flashcards/hooks/useFlashcards";

import FlashcardViewer from "@/features/flashcards/components/FlashcardViewer";

export default function FlashcardsPage() {
  const { contentId } =
    useParams();

  const {
    data,
    isLoading,
    isError,
  } = useFlashcards(contentId);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center text-zinc-400">
        Loading flashcards...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-96 flex-col items-center justify-center">

        <Brain
          size={44}
          className="mb-4 text-red-400"
        />

        <h2 className="text-xl font-semibold text-white">
          Failed to load flashcards
        </h2>

      </div>
    );
  }

  if (
    !data ||
    !data.json ||
    data.json.length === 0
  ) {
    return (
      <div className="flex h-96 flex-col items-center justify-center">

        <Brain
          size={44}
          className="mb-4 text-zinc-500"
        />

        <h2 className="text-xl font-semibold text-white">
          No Flashcards Yet
        </h2>

        <p className="mt-2 text-zinc-400">
          Generate Flashcards from the AI Command Center.
        </p>

      </div>
    );
  }

  return (
    <FlashcardViewer
      cards={data.json}
    />
  );
}