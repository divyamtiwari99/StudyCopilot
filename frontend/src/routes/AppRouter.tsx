import { createBrowserRouter } from "react-router-dom";

import WorkspaceLayout from "../layouts/WorkspaceLayout";

import DashboardPage from "../pages/DashboardPage";
import DocumentsPage from "../pages/DocumentsPage";
import ChatPage from "../pages/ChatPage";
import NotesPage from "../pages/NotesPage";
import QuizPage from "../pages/QuizPage";
import FlashcardsPage from "../pages/FlashcardsPage";
import SettingsPage from "../pages/SettingsPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WorkspaceLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "documents",
        element: <DocumentsPage />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
      {
        path: "notes",
        element: <NotesPage />,
      },
      {
        path: "quiz",
        element: <QuizPage />,
      },
      {
        path: "flashcards",
        element: <FlashcardsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);