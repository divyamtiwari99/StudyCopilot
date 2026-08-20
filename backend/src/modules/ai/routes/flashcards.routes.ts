import { Router } from "express";

import { flashcardsController } from "../controllers/flashcards.controller.js";

const router = Router();

router.post(
  "/generate",
  flashcardsController.generate.bind(
    flashcardsController
  )
);



router.get(
  "/",
  flashcardsController.getAll.bind(
    flashcardsController
  )
);



router.get(
  "/:contentId",
  flashcardsController.get.bind(
    flashcardsController
  )
);



router.delete(
  "/:contentId",
  flashcardsController.delete.bind(
    flashcardsController
  )
);

export default router;