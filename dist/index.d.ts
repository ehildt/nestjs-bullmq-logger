import { DynamicModule, LoggerService } from '@nestjs/common';
import pino, { LoggerOptions } from 'pino';
import Joi from 'joi';
import { Job, JobType } from 'bullmq';

/** Injection token for pino logger options. */
declare const NESTJS_PINO_OPTIONS: unique symbol;

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
declare class BullMQLoggerModule {
    /** Registers the module asynchronously with pino logger configuration. */
    static registerAsync(options: BullMQLoggerModuleProps): DynamicModule;
}

/**
 * Joi validation schema for pino LoggerOptions.
 * Validates level, transport, and pino-pretty options.
 */
declare const BullMQLoggerSchema: Joi.ObjectSchema<pino.LoggerOptions<never, boolean>>;

/**
 * Logger service for BullMQ jobs using pino.
 * Provides emoji state indicators for job visualization.
 */
declare class BullMQLoggerService implements LoggerService {
    private readonly options;
    private logger;
    constructor(options: LoggerOptions);
    onModuleInit(): void;
    /** Returns the underlying pino logger instance. */
    get pino(): pino.Logger<never, boolean>;
    /** Logs job info with state emoji icon. */
    log<T = any>(job: Job<T>, type?: JobType): Promise<void>;
    /** Logs job error with failedReason and stacktrace when state is failed. */
    error<T = any>(job: Job<T>, type?: JobType): Promise<void>;
    /** Logs job warning with queue metadata. */
    warn<T = any>(job: Job<T>, type?: JobType): Promise<void>;
    /** Logs job debug info with opts and data. */
    debug<T = any>(job: Job<T>, type?: JobType): Promise<void>;
    /** Logs verbose trace with full job object. */
    verbose<T = any>(job: Job<T>, type?: JobType): Promise<void>;
    /** Maps job states to emoji icons for log visualization. */
    private getStateIcon;
}

export { BullMQLoggerModule, BullMQLoggerSchema, BullMQLoggerService, NESTJS_PINO_OPTIONS };
