import { Router } from "express";

import notesRoutes from "./notes.routes.js";
import flashcardsRoutes from "./flashcards.routes.js";

const router = Router();

router.use(
  "/notes",
  notesRoutes
);

router.use(
  "/flashcards",
  flashcardsRoutes
);

export default router;