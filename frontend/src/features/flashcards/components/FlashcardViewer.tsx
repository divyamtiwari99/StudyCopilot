import { useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
 RotateCcw,
} from "lucide-react";

import type { Flashcard } from "../types/flashcard.types";

interface FlashcardViewerProps {
  cards: Flashcard[];
}

export default function FlashcardViewer({
  cards,
}: FlashcardViewerProps) {
  const [index, setIndex] =
    useState(0);

  const [flipped, setFlipped] =
    useState(false);

  const card = cards[index];

  function previous() {
    setFlipped(false);

    setIndex((current) =>
      current === 0
        ? cards.length - 1
        : current - 1,
    );
  }

  function next() {
    setFlipped(false);

    setIndex((current) =>
      current === cards.length - 1
        ? 0
        : current + 1,
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold text-white">
          Flashcards
        </h2>

        <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
          {index + 1} / {cards.length}
        </span>

      </div>

      <div
        onClick={() =>
          setFlipped(!flipped)
        }
        className="flex h-[420px] cursor-pointer flex-col justify-center rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center transition hover:border-cyan-500/30"
      >

        <p className="mb-4 text-sm uppercase tracking-widest text-cyan-400">
          {flipped
            ? "Answer"
            : "Question"}
        </p>

        <h2 className="text-3xl font-bold leading-relaxed text-white">

          {flipped
            ? card.answer
            : card.question}

        </h2>

      </div>

      <div className="flex items-center justify-center gap-4">

        <button
          onClick={previous}
          className="rounded-xl border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() =>
            setFlipped(
              !flipped,
            )
          }
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-medium text-white transition hover:bg-cyan-400"
        >
          <RotateCcw
            size={18}
          />

          Flip Card

        </button>

        <button
          onClick={next}
          className="rounded-xl border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10"
        >
          <ChevronRight />
        </button>

      </div>

    </div>
  );
}