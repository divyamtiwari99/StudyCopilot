import { Router } from "express";


import { authController } from "../controllers/auth.controller.js";


import { authMiddleware } from "../middleware/auth.middleware.js";



const router = Router();





router.post(

  "/register",

  authController.register.bind(
    authController,
  ),

);







router.post(

  "/login",

  authController.login.bind(
    authController,
  ),

);







router.put(

  "/profile",

  authMiddleware,

  authController.updateProfile.bind(
    authController,
  ),

);


router.post(
  "/logout",
  authMiddleware,
  authController.logout.bind(
    authController,
  ),
);



export default router;