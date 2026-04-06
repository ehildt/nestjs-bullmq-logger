import Joi from "joi";
import pino from "pino";

/**
 * Joi validation schema for pino LoggerOptions.
 * Validates level, transport, and pino-pretty options.
 */
export const BullMQLoggerSchema = Joi.object<pino.LoggerOptions>({
  level: Joi.string().valid("fatal", "error", "warn", "info", "debug", "trace", "silent").default("info"),
  base: Joi.string().allow(null).default(null),
  timestamp: Joi.func().required(),
  transport: Joi.object({
    target: Joi.string().valid("pino-pretty").default("pino-pretty"),
    options: Joi.object({
      translateTime: Joi.string().default("yyyy-mm-dd HH:MM:ss.l"),
      colorize: Joi.boolean().default(true),
      ignore: Joi.string().default("pid,hostname"),
    }).required(),
  }).required(),
});
