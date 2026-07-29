import { Router } from "express";

import contentModule from "../modules/content/index.js";
import chatModule from "../modules/chat/index.js";

const router = Router();

router.use("/content", contentModule);

router.use("/chat", chatModule);

export default router;