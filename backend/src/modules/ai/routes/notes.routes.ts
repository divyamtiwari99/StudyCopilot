import { Router } from "express";

import { notesController } from "../controllers/notes.controller.js";


const router = Router();



router.post(
  "/generate",
  notesController.generate.bind(
    notesController
  )
);



// Get all notes of logged in user
router.get(
  "/",
  notesController.getAll.bind(
    notesController
  )
);



router.get(
  "/:contentId",
  notesController.get.bind(
    notesController
  )
);
router.delete(
  "/:contentId",
  notesController.delete.bind(
    notesController
  )
);


export default router;