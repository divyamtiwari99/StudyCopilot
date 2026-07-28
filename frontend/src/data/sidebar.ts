import {
  LayoutDashboard,
  FileText,
  Bot,
  NotebookPen,
  Brain,
  Layers3,
  Settings,
} from "lucide-react";

import type { SidebarItem } from "../types/navigation";
import { ROUTES } from "../constants/routes";

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: "Documents",
    path: ROUTES.DOCUMENTS,
    icon: FileText,
  },
  {
    title: "AI Tutor",
    path: ROUTES.CHAT,
    icon: Bot,
  },
  {
    title: "Notes",
    path: ROUTES.NOTES,
    icon: NotebookPen,
  },
  {
    title: "Quiz",
    path: ROUTES.QUIZ,
    icon: Brain,
  },
  {
    title: "Flashcards",
    path: ROUTES.FLASHCARDS,
    icon: Layers3,
  },
  {
    title: "Settings",
    path: ROUTES.SETTINGS,
    icon: Settings,
  },
];