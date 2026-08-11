import { Router } from "express";

import settingsController from "../controllers/settings.controller.js";

import { authMiddleware } from "../../auth/middleware/auth.middleware.js";


const router = Router();



router.get(

  "/",

  authMiddleware,

  settingsController.getSettings,

);



router.put(

  "/",

  authMiddleware,

  settingsController.updateSettings,

);



export default router;