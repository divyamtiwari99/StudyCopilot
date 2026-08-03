import { Router } from "express";

import notesRoutes from "./notes.routes.js";
import flashcardsRoutes from "./flashcards.routes.js";
import quizRoutes from "./quiz.routes.js";
import summaryRoutes from "./summary.routes.js";
import knowledgeGraphRoutes from "./knowledge-graph.routes.js";
import roadmapRoutes from "./roadmap.routes.js";

const router = Router();

router.use(
  "/notes",
  notesRoutes,
);

router.use(
  "/flashcards",
  flashcardsRoutes,
);

router.use(
  "/quiz",
  quizRoutes,
);

router.use(
  "/summary",
  summaryRoutes,
);

router.use(
  "/knowledge-graph",
  knowledgeGraphRoutes,
);

router.use(
  "/roadmap",
  roadmapRoutes,
);

export default router;