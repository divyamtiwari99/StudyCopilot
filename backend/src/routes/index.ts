import { Router } from "express";

import authModule from "../modules/auth/index.js";
import contentModule from "../modules/content/index.js";
import chatModule from "../modules/chat/index.js";

const router = Router();

router.use("/auth", authModule);

router.use("/content", contentModule);

router.use("/chat", chatModule);

export default router;