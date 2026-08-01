export type ChatIntent =
  | "QUESTION"
  | "SUMMARY"
  | "NOTES"
  | "FLASHCARDS"
  | "QUIZ"
  | "COMPARE"
  | "LIST"
  | "EXPLAIN";

export class IntentService {
  detect(question: string): ChatIntent {
    const q = question
      .trim()
      .toLowerCase();

    if (
      q.includes("summary") ||
      q.includes("summarize") ||
      q.includes("overview")
    ) {
      return "SUMMARY";
    }

    if (
      q.includes("note") ||
      q.includes("notes")
    ) {
      return "NOTES";
    }

    if (
      q.includes("flashcard") ||
      q.includes("flash card")
    ) {
      return "FLASHCARDS";
    }

    if (
      q.includes("quiz") ||
      q.includes("mcq") ||
      q.includes("multiple choice")
    ) {
      return "QUIZ";
    }

    if (
      q.includes("compare") ||
      q.includes("difference") ||
      q.includes("vs")
    ) {
      return "COMPARE";
    }

    if (
      q.includes("list") ||
      q.includes("important topics") ||
      q.includes("topics")
    ) {
      return "LIST";
    }

    if (
      q.startsWith("explain") ||
      q.includes("in detail")
    ) {
      return "EXPLAIN";
    }

    return "QUESTION";
  }
}

export const intentService =
  new IntentService();