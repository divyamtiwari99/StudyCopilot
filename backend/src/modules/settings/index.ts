import { Router } from "express";

import settingsRoutes from "./routes/settings.routes.js";


const router = Router();


router.use("/", settingsRoutes);


export default router;