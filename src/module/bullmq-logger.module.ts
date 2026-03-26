import { DynamicModule, Module } from "@nestjs/common";
import { LoggerOptions, pino } from "pino";

import { BULLMQ_LOGGER } from "../constants/bullmq-logger.constants.ts";
import { BullMQLoggerService } from "../service/bullmq-logger.service.ts";

type LoggerConfigFactory = (...deps: any[]) => Promise<LoggerOptions>;

type BullMQLoggerModuleProps = {
  global?: boolean;
  inject: Array<any>;
  useFactory: LoggerConfigFactory;
};

@Module({})
export class BullMQLoggerModule {
  static registerAsync(options: BullMQLoggerModuleProps): DynamicModule {
    return {
      global: options.global,
      module: BullMQLoggerModule,
      exports: [BULLMQ_LOGGER, BullMQLoggerService],
      providers: [
        BullMQLoggerService,
        {
          provide: BULLMQ_LOGGER,
          inject: options.inject,
          useFactory: async (...deps) => pino(await options.useFactory(...deps)),
        },
      ],
    };
  }
}
