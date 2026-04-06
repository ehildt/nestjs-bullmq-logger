import { Inject, Injectable, LoggerService } from "@nestjs/common";
import { Job, JobState, JobType } from "bullmq";
import pino, { LoggerOptions } from "pino";
import { format } from "util";

import { NESTJS_PINO_OPTIONS } from "../constants/bullmq-logger.constants.ts";

type JobTypeExtended = JobType | "canceled";

const MSG_TEMPLATE = "📦 %s(%s) 🆔 ID-%s 🔄 Attempts-%d %s %s";

/**
 * Logger service for BullMQ jobs using pino.
 * Provides emoji state indicators for job visualization.
 */
@Injectable()
export class BullMQLoggerService implements LoggerService {
  private logger: pino.Logger | null = null;
  constructor(@Inject(NESTJS_PINO_OPTIONS) private readonly options: LoggerOptions) {}

  onModuleInit() {
    this.logger = pino(this.options);
  }

  /** Returns the underlying pino logger instance. */
  get pino() {
    return this.logger!;
  }

  /** Logs job info with state emoji icon. */
  async log<T = any>(job: Job<T>, type?: JobTypeExtended) {
    const state = await job.getState();
    this.logger!.info(
      format(MSG_TEMPLATE, job.queueName, job.name, job.id, job.attemptsMade, this.getStateIcon(type ?? state), state),
    );
  }

  /** Logs job error with failedReason and stacktrace when state is failed. */
  async error<T = any>(job: Job<T>, type?: JobTypeExtended) {
    const state = await job.getState();
    this.logger!.error({
      msg: format(
        MSG_TEMPLATE,
        job.queueName,
        job.name,
        job.id,
        job.attemptsMade,
        this.getStateIcon(type ?? state),
        state,
      ),
      failedReason: state === "failed" ? job.failedReason : undefined,
      stacktrace: state === "failed" ? job.stacktrace : undefined,
    });
  }

  /** Logs job warning with queue metadata. */
  async warn<T = any>(job: Job<T>, type?: JobTypeExtended) {
    const state = await job.getState();
    this.logger!.warn({
      msg: format(
        MSG_TEMPLATE,
        job.queueName,
        job.name,
        job.id,
        job.attemptsMade,
        this.getStateIcon(type ?? state),
        state,
      ),
      queue: job.queueName,
      maxAttempts: job.opts?.attempts,
      delay: job.opts?.delay,
      timestamp: job.timestamp,
      processedOn: job.processedOn,
      finishedOn: job.finishedOn,
    });
  }

  /** Logs job debug info with opts and data. */
  async debug<T = any>(job: Job<T>, type?: JobTypeExtended) {
    const state = await job.getState();
    this.logger!.debug({
      msg: format(
        MSG_TEMPLATE,
        job.queueName,
        job.name,
        job.id,
        job.attemptsMade,
        this.getStateIcon(type ?? state),
        state,
      ),
      queue: job.queueName,
      timestamp: job.timestamp,
      opts: job.opts,
      data: job.data,
    });
  }

  /** Logs verbose trace with full job object. */
  async verbose<T = any>(job: Job<T>, type?: JobTypeExtended) {
    const state = await job.getState();
    this.logger!.trace(
      job,
      format(MSG_TEMPLATE, job.queueName, job.name, job.id, job.attemptsMade, this.getStateIcon(type ?? state), state),
    );
  }

  /** Maps job states to emoji icons for log visualization. */
  private getStateIcon(state: JobState | unknown) {
    switch (state) {
      case "completed":
        return "🟢";
      case "error":
        return "🔴";
      case "failed":
        return "⚫";
      case "delayed":
        return "🟠";
      case "waiting":
        return "🟡";
      case "prioritized":
        return "🔵";
      case "active":
        return "🟣";
      case "waiting-children":
        return "🟤";
      case "paused":
        return "⚪";
      case "stalled":
        return "🔘";
      case "canceled":
        return "⭕";
      default:
        return "🚫";
    }
  }
}
