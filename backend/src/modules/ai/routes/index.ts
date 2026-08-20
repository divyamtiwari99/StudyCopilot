import { Router } from "express";
import { authMiddleware } from "../../auth/middleware/auth.middleware.js";
import { rateLimit } from "../../../middleware/rate-limit.middleware.js";
import { env } from "../../../config/env.js";

import notesRoutes from "./notes.routes.js";
import flashcardsRoutes from "./flashcards.routes.js";
import quizRoutes from "./quiz.routes.js";
import summaryRoutes from "./summary.routes.js";
import knowledgeGraphRoutes from "./knowledge-graph.routes.js";
import roadmapRoutes from "./roadmap.routes.js";
import studyPlannerRoutes from "./study-planner.routes.js";

const router = Router();
const generationRateLimit = rateLimit({
  name: "ai-generation",
  windowMs: 5 * 60_000,
  // Keep application-level bursts below the token-limited free provider
  // configuration while still allowing the environment to raise the limit
  // when a higher provider plan is configured.
  max: Math.min(env.AI_RATE_LIMIT_PER_5_MINUTES, 10),
  key: (req) => req.user?.id || req.ip || "unknown",
});

router.use(authMiddleware);
router.use((req, res, next) => {
  const isGeneration = req.method === "POST" && /\/(generate|regenerate)$/.test(req.path);
  if (isGeneration) return generationRateLimit(req, res, next);
  return next();
});

router.use("/notes", notesRoutes);
router.use("/flashcards", flashcardsRoutes);
router.use("/quiz", quizRoutes);
router.use("/summary", summaryRoutes);
router.use("/knowledge-graph", knowledgeGraphRoutes);
router.use("/roadmap", roadmapRoutes);
router.use("/study-planner", studyPlannerRoutes);

export default router;
