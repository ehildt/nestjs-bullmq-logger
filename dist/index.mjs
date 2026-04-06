import { Injectable, Inject, Module } from '@nestjs/common';
import pino from 'pino';
import { format } from 'util';
import Joi from 'joi';

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// src/constants/bullmq-logger.constants.ts
var NESTJS_PINO_OPTIONS = /* @__PURE__ */ Symbol("NESTJS_PINO_OPTIONS");
var MSG_TEMPLATE = "\u{1F4E6} %s(%s) \u{1F194} ID-%s \u{1F504} Attempts-%d %s %s";
var BullMQLoggerService = class {
  constructor(options) {
    this.options = options;
  }
  logger = null;
  onModuleInit() {
    this.logger = pino(this.options);
  }
  /** Returns the underlying pino logger instance. */
  get pino() {
    return this.logger;
  }
  /** Logs job info with state emoji icon. */
  async log(job, type) {
    const state = await this.getJobState(job, type);
    this.logger.info(
      format(MSG_TEMPLATE, job.queueName, job.name, job.id, job.attemptsMade, this.getStateIcon(type ?? state), state)
    );
  }
  /** Logs job error with failedReason and stacktrace when state is failed. */
  async error(job, type) {
    const state = await this.getJobState(job, type);
    this.logger.error({
      msg: format(
        MSG_TEMPLATE,
        job.queueName,
        job.name,
        job.id,
        job.attemptsMade,
        this.getStateIcon(type ?? state),
        state
      ),
      failedReason: state === "failed" ? job.failedReason : void 0,
      stacktrace: state === "failed" ? job.stacktrace : void 0
    });
  }
  /** Logs job warning with queue metadata. */
  async warn(job, type) {
    const state = await this.getJobState(job, type);
    this.logger.warn({
      msg: format(
        MSG_TEMPLATE,
        job.queueName,
        job.name,
        job.id,
        job.attemptsMade,
        this.getStateIcon(type ?? state),
        state
      ),
      queue: job.queueName,
      maxAttempts: job.opts?.attempts,
      delay: job.opts?.delay,
      timestamp: job.timestamp,
      processedOn: job.processedOn,
      finishedOn: job.finishedOn
    });
  }
  /** Logs job debug info with opts and data. */
  async debug(job, type) {
    const state = await this.getJobState(job, type);
    this.logger.debug({
      msg: format(
        MSG_TEMPLATE,
        job.queueName,
        job.name,
        job.id,
        job.attemptsMade,
        this.getStateIcon(type ?? state),
        state
      ),
      queue: job.queueName,
      timestamp: job.timestamp,
      opts: job.opts,
      data: job.data
    });
  }
  /** Logs verbose trace with full job object. */
  async verbose(job, type) {
    const state = await this.getJobState(job, type);
    this.logger.trace(
      job,
      format(MSG_TEMPLATE, job.queueName, job.name, job.id, job.attemptsMade, this.getStateIcon(type ?? state), state)
    );
  }
  /** Safely gets job state, handling cases where getState() is not available. */
  async getJobState(job, type) {
    if (type) return type;
    if (typeof job.getState === "function") return await job.getState();
    if (job.failedReason) return "failed";
    if (job.finishedOn) return "completed";
    if (job.processedOn) return "active";
    return "error";
  }
  /** Maps job states to emoji icons for log visualization. */
  getStateIcon(state) {
    switch (state) {
      case "completed":
        return "\u{1F7E2}";
      case "error":
        return "\u{1F534}";
      case "failed":
        return "\u26AB";
      case "delayed":
        return "\u{1F7E0}";
      case "waiting":
        return "\u{1F7E1}";
      case "prioritized":
        return "\u{1F535}";
      case "active":
        return "\u{1F7E3}";
      case "waiting-children":
        return "\u{1F7E4}";
      case "paused":
        return "\u26AA";
      case "stalled":
        return "\u{1F518}";
      case "canceled":
        return "\u2B55";
      default:
        return "\u{1F6AB}";
    }
  }
};
BullMQLoggerService = __decorateClass([
  Injectable(),
  __decorateParam(0, Inject(NESTJS_PINO_OPTIONS))
], BullMQLoggerService);

// src/module/bullmq-logger.module.ts
var BullMQLoggerModule = class {
  /** Registers the module asynchronously with pino logger configuration. */
  static registerAsync(options) {
    const PinoOptionsProvider = {
      provide: NESTJS_PINO_OPTIONS,
      inject: options.inject,
      useFactory: options.useFactory
    };
    return {
      global: options.global,
      module: BullMQLoggerModule,
      exports: [NESTJS_PINO_OPTIONS, BullMQLoggerService],
      providers: [PinoOptionsProvider, BullMQLoggerService]
    };
  }
};
BullMQLoggerModule = __decorateClass([
  Module({})
], BullMQLoggerModule);
var BullMQLoggerSchema = Joi.object({
  level: Joi.string().valid("fatal", "error", "warn", "info", "debug", "trace", "silent").default("info"),
  base: Joi.string().allow(null).default(null),
  timestamp: Joi.func().required(),
  transport: Joi.object({
    target: Joi.string().valid("pino-pretty").default("pino-pretty"),
    options: Joi.object({
      translateTime: Joi.string().default("yyyy-mm-dd HH:MM:ss.l"),
      colorize: Joi.boolean().default(true),
      ignore: Joi.string().default("pid,hostname")
    }).required()
  }).required()
});

export { BullMQLoggerModule, BullMQLoggerSchema, BullMQLoggerService, NESTJS_PINO_OPTIONS };
