import { Router } from "express";

import { authMiddleware } from "../../auth/middleware/auth.middleware.js";

import { knowledgeGraphController } from "../controllers/knowledge-graph.controller.js";

const router = Router();

router.post(
  "/generate",
  authMiddleware,
  knowledgeGraphController.generate.bind(
    knowledgeGraphController
  )
);

router.post(
  "/regenerate",
  authMiddleware,
  knowledgeGraphController.regenerate.bind(
    knowledgeGraphController
  )
);

router.get(
  "/:contentId",
  authMiddleware,
  knowledgeGraphController.get.bind(
    knowledgeGraphController
  )
);

export default router;