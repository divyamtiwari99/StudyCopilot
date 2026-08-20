import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { csrfMiddleware } from "../middleware/csrf.middleware.js";
import { rateLimit } from "../../../middleware/rate-limit.middleware.js";
import { env } from "../../../config/env.js";
import multer from "multer";

const router = Router();
const avatarUpload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024, files: 1 } });

router.post(
  "/register",
  rateLimit({ name: "auth-register", windowMs: 60_000, max: env.AUTH_RATE_LIMIT_PER_MINUTE }),
  authController.register.bind(authController),
);

router.post(
  "/login",
  rateLimit({ name: "auth-login", windowMs: 60_000, max: env.AUTH_RATE_LIMIT_PER_MINUTE }),
  authController.login.bind(authController),
);

router.post(
  "/refresh",
  csrfMiddleware,
  rateLimit({ name: "auth-refresh", windowMs: 60_000, max: env.AUTH_RATE_LIMIT_PER_MINUTE }),
  authController.refresh.bind(authController),
);

router.put(
  "/profile",
  authMiddleware,
  csrfMiddleware,
  authController.updateProfile.bind(authController),
);

router.post(
  "/profile/avatar",
  authMiddleware,
  csrfMiddleware,
  avatarUpload.single("avatar"),
  authController.uploadAvatar.bind(authController),
);

router.post(
  "/logout",
  csrfMiddleware,
  authController.logout.bind(authController),
);

export default router;
