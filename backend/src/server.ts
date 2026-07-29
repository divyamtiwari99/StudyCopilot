import "./modules/content/parser/index.js";
import "./modules/content/processing/processor.worker.js";

import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { logger } from "./core/logger/logger.js";

async function startServer() {
  try {
    await connectDatabase();

    app.listen(env.PORT, () => {
      logger.info(`🚀 Server running on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error(error);

    process.exit(1);
  }
}

startServer();