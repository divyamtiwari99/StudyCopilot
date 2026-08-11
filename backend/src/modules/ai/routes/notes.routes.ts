import { Router } from "express";

import { authMiddleware } from "../../auth/middleware/auth.middleware.js";

import { notesController } from "../controllers/notes.controller.js";


const router = Router();



router.post(
  "/generate",
  authMiddleware,
  notesController.generate.bind(
    notesController
  )
);



// Get all notes of logged in user
router.get(
  "/",
  authMiddleware,
  notesController.getAll.bind(
    notesController
  )
);



router.get(
  "/:contentId",
  authMiddleware,
  notesController.get.bind(
    notesController
  )
);
router.delete(
  "/:contentId",
  authMiddleware,
  notesController.delete.bind(
    notesController
  )
);


export default router;