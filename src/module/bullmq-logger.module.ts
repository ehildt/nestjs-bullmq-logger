import { DynamicModule, Module } from "@nestjs/common";
import { LoggerOptions } from "pino";

import { NESTJS_PINO_OPTIONS } from "../constants/bullmq-logger.constants.ts";
import { BullMQLoggerService } from "../service/bullmq-logger.service.ts";

type LoggerConfigFactory = (...deps: any[]) => Promise<LoggerOptions> | LoggerOptions;

type BullMQLoggerModuleProps = {
  global?: boolean;
  inject: Array<any>;
  useFactory: LoggerConfigFactory;
};

/**
 * Dynamic module for registering BullMQ logger with pino options.
 * Use registerAsync() to configure the logger factory.
 */
@Module({})
export class BullMQLoggerModule {
  /** Registers the module asynchronously with pino logger configuration. */
  static registerAsync(options: BullMQLoggerModuleProps): DynamicModule {
    const PinoOptionsProvider = {
      provide: NESTJS_PINO_OPTIONS,
      inject: options.inject,
      useFactory: options.useFactory,
    };

    return {
      global: options.global,
      module: BullMQLoggerModule,
      exports: [NESTJS_PINO_OPTIONS, BullMQLoggerService],
      providers: [PinoOptionsProvider, BullMQLoggerService],
    };
  }
}
