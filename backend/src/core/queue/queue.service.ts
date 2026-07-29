import crypto from "crypto";

import { logger } from "../logger/logger.js";
import { Job } from "./job.interface.js";

type JobHandler<T = unknown> = (payload: T) => Promise<void>;

export class QueueService {
  private handlers = new Map<string, JobHandler>();

  register<T>(name: string, handler: JobHandler<T>) {
    this.handlers.set(name, handler as JobHandler);
  }

  async dispatch<T>(name: string, payload: T) {
    const job: Job<T> = {
      id: crypto.randomUUID(),
      name,
      payload,
      attempts: 0,
    };

    const handler = this.handlers.get(name);

    if (!handler) {
      throw new Error(`No handler registered for ${name}`);
    }

    logger.info({
      jobId: job.id,
      job: job.name,
    });

    await handler(job.payload);
  }
}

export const queueService = new QueueService();