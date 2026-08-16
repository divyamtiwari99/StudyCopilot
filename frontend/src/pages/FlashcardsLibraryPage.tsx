import {
  Brain,
  Sparkles,
} from "lucide-react";

import FlashcardCard from "@/features/flashcards/components/FlashcardCard";

import {
  useAllFlashcards,
} from "@/features/flashcards/hooks/useAllFlashcards";

export default function FlashcardsLibraryPage() {
  const {
    data: flashcards,
    isLoading,
    isError,
  } = useAllFlashcards();

  if (isLoading) {
    return (
      <div
        className="
          flex
          min-h-[400px]
          items-center
          justify-center
          rounded-3xl
          border
        "
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--surface)",
          color: "var(--muted)",
        }}
      >
        Loading flashcards...
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
          flex
          min-h-[400px]
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          p-10
          text-center
        "
        style={{
          borderColor:
            "color-mix(in srgb,#ef4444 20%,var(--border))",
          backgroundColor:
            "color-mix(in srgb,#ef4444 5%,var(--surface))",
        }}
      >
        <Brain
          size={48}
          className="mb-4 text-red-400"
        />

        <h2
          className="
            text-xl
            font-semibold
          "
          style={{
            color: "var(--text)",
          }}
        >
          Failed to load flashcards
        </h2>

        <p
          className="
            mt-2
          "
          style={{
            color: "var(--muted)",
          }}
        >
          Something went wrong while loading your
          flashcard library.
        </p>
      </div>
    );
  }

  if (
    !flashcards ||
    flashcards.length === 0
  ) {
    return (
      <div
        className="
          flex
          min-h-[450px]
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          p-10
          text-center
        "
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--surface)",
        }}
      >
        <Brain
          size={56}
          className="mb-5"
          style={{
            color: "var(--muted)",
          }}
        />

        <h2
          className="
            text-2xl
            font-bold
          "
          style={{
            color: "var(--text)",
          }}
        >
          No Flashcards Found
        </h2>

        <p
          className="
            mt-3
            max-w-md
          "
          style={{
            color: "var(--muted)",
          }}
        >
          Generate flashcards from your document
          workspace using the AI Command Center.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        space-y-8
      "
    >
      <div
        className="
          rounded-3xl
          border
          p-8
        "
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--surface)",
        }}
      >
        <div
          className="
            flex
            items-center
            gap-4
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
            "
            style={{
              backgroundColor:
                "color-mix(in srgb,var(--accent-color) 10%,transparent)",
            }}
          >
            <Sparkles
              size={26}
              style={{
                color: "var(--accent-color)",
              }}
            />
          </div>

          <div>
            <h1
              className="
                text-3xl
                font-bold
              "
              style={{
                color: "var(--text)",
              }}
            >
              Flashcard Library
            </h1>

            <p
              className="
                mt-1
              "
              style={{
                color: "var(--muted)",
              }}
            >
              Review and practice your generated
              flashcards.
            </p>
          </div>
        </div>

        <div
          className="
            mt-6
            inline-flex
            rounded-xl
            border
            px-4
            py-2
            text-sm
          "
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surfaceHover)",
            color: "var(--muted)",
          }}
        >
          {flashcards.length} Flashcard Set
          {flashcards.length !== 1 && "s"}
        </div>
      </div>

      <div
        className="
          grid
          gap-5
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {flashcards.map(
          (flashcard) => (
            <FlashcardCard
              key={flashcard._id}
              flashcard={flashcard}
            />
          ),
        )}
      </div>
    </div>
  );
}