import type {
  SuggestedQuestion,
} from "../types/chat.types";

export const suggestedQuestions: SuggestedQuestion[] =
  [
    {
      id: "summary",
      label: "📚 Summarize",
      prompt:
        "Summarize this document.",
    },

    {
      id: "explain",
      label: "🧠 Explain Simply",
      prompt:
        "Explain this document in simple language.",
    },

    {
      id: "quiz",
      label: "❓ Generate Quiz",
      prompt:
        "Generate a quiz from this document.",
    },

    {
      id: "flashcards",
      label: "🗂 Create Flashcards",
      prompt:
        "Generate flashcards from this document.",
    },

    {
      id: "notes",
      label: "📝 Study Notes",
      prompt:
        "Create revision notes from this document.",
    },

    {
      id: "important",
      label: "⭐ Important Topics",
      prompt:
        "List all important topics.",
    },
  ];