import { logger } from "../logger/logger.js";
import { QueueJobModel } from "./queue-job.model.js";
import type { Job, QueueDispatchOptions } from "./job.interface.js";
import { env } from "../../config/env.js";
import type { Types } from "mongoose";

type JobHandler<T = unknown> = (payload: T) => Promise<void>;

export class QueueService {
  private handlers = new Map<string, JobHandler>();
  private timer: ReturnType<typeof setInterval> | null = null;
  private running = false;
  private polling = false;
  private activeJobs = 0;
  private lastRecoveryAt = 0;
  private readonly pollIntervalMs = 1000;
  private readonly lockMs = 60_000;

  register<T>(name: string, handler: JobHandler<T>) {
    this.handlers.set(name, handler as JobHandler);
  }

  async dispatch<T>(name: string, payload: T, options: QueueDispatchOptions = {}): Promise<Job<T>> {
    if (!this.handlers.has(name)) throw new Error(`No handler registered for ${name}`);

    const now = new Date();
    const availableAt = new Date(now.getTime() + (options.delayMs ?? 0));
    const maxAttempts = Math.max(1, options.maxAttempts ?? 3);

    if (options.dedupeKey) {
      const existing = await QueueJobModel.findOne({
        name,
        dedupeKey: options.dedupeKey,
        status: { $in: ["queued", "running"] },
      }).lean();
      if (existing) return { id: existing._id.toString(), name: existing.name, payload: existing.payload as T, attempts: existing.attempts };
    }

    try {
      const created = await QueueJobModel.create({
        name,
        payload,
        status: "queued",
        attempts: 0,
        maxAttempts,
        availableAt,
        dedupeKey: options.dedupeKey ?? null,
      });
      logger.info({ jobId: created.id, job: name }, "Queue job created");
      return { id: created.id, name, payload, attempts: 0 };
    } catch (error) {
      if (options.dedupeKey && typeof error === "object" && error !== null && "code" in error && error.code === 11000) {
        const existing = await QueueJobModel.findOne({ name, dedupeKey: options.dedupeKey, status: { $in: ["queued", "running"] } }).lean();
        if (existing) return { id: existing._id.toString(), name, payload: existing.payload as T, attempts: existing.attempts };
      }
      throw error;
    }
  }

  async start() {
    if (this.running) return;
    this.running = true;
    await this.recoverStaleJobs();
    this.timer = setInterval(() => {
      void this.poll().catch((error) => logger.error({ error }, "Queue poll failed"));
    }, this.pollIntervalMs);
    await this.poll();
  }

  async stop() {
    this.running = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    const deadline = Date.now() + 30_000;
    while ((this.activeJobs > 0 || this.polling) && Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    if (this.activeJobs > 0) logger.warn({ activeJobs: this.activeJobs }, "Queue shutdown timed out; active jobs may be interrupted");
  }

  async cancelByDedupeKey(dedupeKey: string) {
    await QueueJobModel.updateMany(
      { dedupeKey, status: { $in: ["queued", "running"] } },
      { $set: { status: "failed", lastError: "Cancelled", lockedUntil: null } },
    );
  }

  private async recoverStaleJobs() {
    await QueueJobModel.updateMany(
      { status: "running", lockedUntil: { $lt: new Date() } },
      { $set: { status: "queued", lockedUntil: null } },
    );
  }

  private async poll() {
    if (!this.running || this.polling) return;
    this.polling = true;
    try {
      if (Date.now() - this.lastRecoveryAt >= 15_000) {
        await this.recoverStaleJobs();
        this.lastRecoveryAt = Date.now();
      }
      while (this.running && this.activeJobs < env.QUEUE_CONCURRENCY) {
        const job = await QueueJobModel.findOneAndUpdate(
          {
            status: "queued",
            availableAt: { $lte: new Date() },
            $or: [{ lockedUntil: null }, { lockedUntil: { $lt: new Date() } }],
          },
          {
            $set: { status: "running", lockedUntil: new Date(Date.now() + this.lockMs) },
            $inc: { attempts: 1 },
          },
          { sort: { createdAt: 1 }, new: true },
        );

        if (!job) break;
        const handler = this.handlers.get(job.name);
        if (!handler) {
          await QueueJobModel.findByIdAndUpdate(job._id, { $set: { status: "failed", lastError: `No handler registered for ${job.name}`, lockedUntil: null } });
          continue;
        }

        this.activeJobs += 1;
        void this.runJob(job, handler).finally(() => {
          this.activeJobs -= 1;
        });
      }
    } finally {
      this.polling = false;
    }
  }

  private async runJob(job: { _id: Types.ObjectId; name: string; payload: unknown; attempts: number; maxAttempts: number }, handler: JobHandler) {
    const heartbeat = setInterval(() => {
      void QueueJobModel.findOneAndUpdate(
        { _id: job._id, status: "running" },
        { $set: { lockedUntil: new Date(Date.now() + this.lockMs) } },
      ).catch(() => undefined);
    }, Math.floor(this.lockMs / 2));

    try {
      await handler(job.payload);
      await QueueJobModel.findOneAndUpdate(
        { _id: job._id, status: "running" },
        { $set: { status: "completed", lockedUntil: null } },
      );
    } catch (error) {
      const attempts = job.attempts;
      const lastError = error instanceof Error ? error.message : "Unknown queue error";
      if (attempts >= job.maxAttempts) {
        await QueueJobModel.findOneAndUpdate(
          { _id: job._id, status: "running" },
          { $set: { status: "failed", lastError, lockedUntil: null } },
        );
      } else {
        const delayMs = Math.min(60_000, 1000 * 2 ** Math.max(0, attempts - 1));
        await QueueJobModel.findOneAndUpdate(
          { _id: job._id, status: "running" },
          { $set: { status: "queued", availableAt: new Date(Date.now() + delayMs), lockedUntil: null, lastError } },
        );
      }
      logger.error({ error, jobId: job._id.toString(), job: job.name, attempts }, "Queue job failed");
    } finally {
      clearInterval(heartbeat);
    }
  }
}

export const queueService = new QueueService();
