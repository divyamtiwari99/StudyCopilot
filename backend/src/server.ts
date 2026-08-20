import "./modules/content/parser/index.js";
import "./modules/content/processing/processor.worker.js";
import "./core/storage/storage-cleanup.worker.js";

import mongoose from "mongoose";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { logger } from "./core/logger/logger.js";
import { queueService } from "./core/queue/queue.service.js";

async function startServer() {
  await connectDatabase();
  await queueService.start();

  const server = app.listen(env.PORT, () => {
    logger.info({ port: env.PORT }, "Server running");
  });

  let shuttingDown = false;
  const shutdown = async (signal: string) => {
    if (shuttingDown) return;
    shuttingDown = true;
    logger.info({ signal }, "Shutdown requested");

    const forceExit = setTimeout(() => {
      logger.error("Forced shutdown after timeout");
      process.exit(1);
    }, 35_000);
    forceExit.unref();

    await queueService.stop();
    await new Promise<void>((resolve) => server.close(() => resolve()));
    await mongoose.disconnect();

    clearTimeout(forceExit);
    process.exit(0);
  };

  process.once("SIGINT", () => void shutdown("SIGINT"));
  process.once("SIGTERM", () => void shutdown("SIGTERM"));
  process.on("unhandledRejection", (error) => logger.error({ error }, "Unhandled promise rejection"));
  process.on("uncaughtException", (error) => {
    logger.fatal({ error }, "Uncaught exception");
    void shutdown("uncaughtException");
  });
}

startServer().catch((error) => {
  logger.fatal({ error }, "Server startup failed");
  process.exit(1);
});
