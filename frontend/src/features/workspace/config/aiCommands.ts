import {
  Brain,
  FileText,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export const aiCommands = [
  {
    id: "notes",
    title: "Notes",
    description:
      "Generate structured study notes.",
    icon: FileText,
  },

  {
    id: "summary",
    title: "Summary",
    description:
      "Create a concise document summary.",
    icon: Sparkles,
  },

  {
    id: "flashcards",
    title: "Flashcards",
    description:
      "Generate AI flashcards for revision.",
    icon: Brain,
  },

  {
    id: "quiz",
    title: "Quiz",
    description:
      "Generate an exam-style quiz.",
    icon: GraduationCap,
  },
] as const;

export type AICommand =
  (typeof aiCommands)[number]["id"];