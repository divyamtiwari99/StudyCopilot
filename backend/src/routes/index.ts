import { Router } from "express";
import contentModule from "../modules/content/index.js";

const router = Router();

router.use("/content", contentModule);

export default router;