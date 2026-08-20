import { Router } from "express";

import { knowledgeGraphController } from "../controllers/knowledge-graph.controller.js";

const router = Router();

router.post(
  "/generate",
  knowledgeGraphController.generate.bind(
    knowledgeGraphController
  )
);

router.post(
  "/regenerate",
  knowledgeGraphController.regenerate.bind(
    knowledgeGraphController
  )
);

router.get(
  "/:contentId",
  knowledgeGraphController.get.bind(
    knowledgeGraphController
  )
);

export default router;