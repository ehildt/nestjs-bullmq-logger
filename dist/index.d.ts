import { DynamicModule, LoggerService } from '@nestjs/common';
import pino, { LoggerOptions } from 'pino';
import Joi from 'joi';
import { Job } from 'bullmq';

declare const NESTJS_PINO_OPTIONS: unique symbol;

type LoggerConfigFactory = (...deps: any[]) => Promise<LoggerOptions> | LoggerOptions;
type BullMQLoggerModuleProps = {
    global?: boolean;
    inject: Array<any>;
    useFactory: LoggerConfigFactory;
};
declare class BullMQLoggerModule {
    static registerAsync(options: BullMQLoggerModuleProps): DynamicModule;
}

declare const BullMQLoggerSchema: Joi.ObjectSchema<pino.LoggerOptions<never, boolean>>;

declare class BullMQLoggerService implements LoggerService {
    private readonly options;
    private logger;
    constructor(options: LoggerOptions);
    onModuleInit(): void;
    get pino(): pino.Logger<never, boolean>;
    log<T = any>(job: Job<T>): Promise<void>;
    error<T = any>(job: Job<T>): Promise<void>;
    warn<T = any>(job: Job<T>): Promise<void>;
    debug<T = any>(job: Job<T>): Promise<void>;
    verbose<T = any>(job: Job<T>): Promise<void>;
    private getStateIcon;
}

export { BullMQLoggerModule, BullMQLoggerSchema, BullMQLoggerService, NESTJS_PINO_OPTIONS };
