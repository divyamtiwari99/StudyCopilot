import { createBrowserRouter } from "react-router-dom";

import WorkspaceLayout from "../layouts/WorkspaceLayout";
import AuthLayout from "../layouts/auth/AuthLayout";

import ProtectedRoute from "./guards/ProtectedRoute";
import PublicRoute from "./guards/PublicRoute";

import DashboardPage from "../pages/DashboardPage";
import DocumentsPage from "../pages/DocumentsPage";
import ChatPage from "../pages/ChatPage";
import NotesPage from "../pages/NotesPage";
import QuizPage from "../pages/QuizPage";
import FlashcardsPage from "../pages/FlashcardsPage";
import SettingsPage from "../pages/SettingsPage";
import NotFoundPage from "../pages/NotFoundPage";

/* Landing */
import LandingPage from "../pages/LandingPage";

import {
  LoginPage,
  RegisterPage,
} from "../features/auth";

export const router = createBrowserRouter([
  /* ===========================
        PUBLIC WEBSITE
     =========================== */

  {
    path: "/",
    element: <LandingPage />,
  },

  {
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },

  /* ===========================
        APP
     =========================== */

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <WorkspaceLayout />
      </ProtectedRoute>
    ),
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