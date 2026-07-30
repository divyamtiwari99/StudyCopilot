import { Router } from "express";

import authRoutes from "./routes/auth.routes.js";
import meRoutes from "./routes/me.routes.js";

const router = Router();

router.use(authRoutes);

router.use(meRoutes);

export default router;