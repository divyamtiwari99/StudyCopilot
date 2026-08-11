import { createBrowserRouter } from "react-router-dom";

import WorkspaceLayout from "../layouts/WorkspaceLayout";
import AuthLayout from "../layouts/auth/AuthLayout";

import ProtectedRoute from "./guards/ProtectedRoute";
import PublicRoute from "./guards/PublicRoute";

import DashboardPage from "../pages/DashboardPage";
import DocumentsPage from "../pages/DocumentsPage";
import WorkspacePage from "../pages/WorkspacePage";

import ChatPage from "../pages/ChatPage";

import NotesLibraryPage from "../pages/NotesLibraryPage";

import QuizLibraryPage from "../pages/QuizLibraryPage";

import FlashcardsLibraryPage from "../pages/FlashcardsLibraryPage";
import StudyPlannerDashboardPage from "../pages/StudyPlannerDashboardPage";
import StudyPlannerPage from "../pages/StudyPlannerPage";

import SettingsPage from "../pages/SettingsPage";
import NotFoundPage from "../pages/NotFoundPage";
import ChatWorkspacePage from "../pages/ChatWorkspacePage";
import LandingPage from "../pages/LandingPage";

import {
  LoginPage,
  RegisterPage,
} from "../features/auth";

export const router =
  createBrowserRouter([
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
          path: "workspace/:contentId",
          element: <WorkspacePage />,
        },

        {
          path: "chat",
          element: <ChatPage />,
        },

        {
          path: "chat/:contentId",
          element: (
            <ChatWorkspacePage />
          ),
        },



        // ==========================
        // Study Planner Dashboard
        // ==========================

        {
          path: "study-planner",
          element: (
            <StudyPlannerDashboardPage />
          ),
        },

        // ==========================
        // Single Study Planner
        // ==========================

        {
          path: "study-planner/:contentId",
          element: (
            <StudyPlannerPage />
          ),
        },

        {
          path: "notes",
          element: <NotesLibraryPage />,
        },

        {
          path: "quiz",
          element: <QuizLibraryPage />,
        },

        {
          path: "flashcards",
          element: <FlashcardsLibraryPage />,
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