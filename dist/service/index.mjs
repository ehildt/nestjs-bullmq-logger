import { Injectable, Inject } from '@nestjs/common';
import { format } from 'util';

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
var BULLMQ_LOGGER = /* @__PURE__ */ Symbol("BULLMQ_LOGGER");

// src/service/bullmq-logger.service.ts
var MSG_TEMPLATE = "\u{1F4E6} %s(%s) \u{1F194} ID-%s \u{1F504} Attempts-%d %s %s";
var BullMQLoggerService = class {
  constructor(logger) {
    this.logger = logger;
  }
  async log(job) {
    const state = await job.getState();
    this.logger.info(
      format(MSG_TEMPLATE, job.queueName, job.name, job.id, job.attemptsMade, this.getStateIcon(state), state)
    );
  }
  async error(job) {
    const state = await job.getState();
    this.logger.error({
      msg: format(MSG_TEMPLATE, job.queueName, job.name, job.id, job.attemptsMade, this.getStateIcon(state), state),
      failedReason: state === "failed" ? job.failedReason : void 0,
      stacktrace: state === "failed" ? job.stacktrace : void 0
    });
  }
  async warn(job) {
    const state = await job.getState();
    this.logger.warn({
      msg: format(MSG_TEMPLATE, job.queueName, job.name, job.id, job.attemptsMade, this.getStateIcon(state), state),
      queue: job.queueName,
      maxAttempts: job.opts?.attempts,
      delay: job.opts?.delay,
      timestamp: job.timestamp,
      processedOn: job.processedOn,
      finishedOn: job.finishedOn
    });
  }
  async debug(job) {
    const state = await job.getState();
    this.logger.debug({
      msg: format(MSG_TEMPLATE, job.queueName, job.name, job.id, job.attemptsMade, this.getStateIcon(state), state),
      queue: job.queueName,
      timestamp: job.timestamp,
      opts: job.opts,
      data: job.data
    });
  }
  async verbose(job) {
    const state = await job.getState();
    this.logger.trace(
      job,
      format(MSG_TEMPLATE, job.queueName, job.name, job.id, job.attemptsMade, this.getStateIcon(state), state)
    );
  }
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
        return "\u2B55";
      case "stalled":
        return "\u{1F518}";
      default:
        return "\u26AA";
    }
  }
};
BullMQLoggerService = __decorateClass([
  Injectable(),
  __decorateParam(0, Inject(BULLMQ_LOGGER))
], BullMQLoggerService);

export { BullMQLoggerService };
