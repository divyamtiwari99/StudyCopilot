import { Router } from "express";
import contentRoutes from "./routes/content.routes.js";

const router = Router();

router.use("/", contentRoutes);

export default router;