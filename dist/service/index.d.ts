import { LoggerService } from '@nestjs/common';
import { Job } from 'bullmq';
import { Logger } from 'pino';

declare class BullMQLoggerService implements LoggerService {
    private readonly logger;
    constructor(logger: Logger);
    log<T = any>(job: Job<T>): Promise<void>;
    error<T = any>(job: Job<T>): Promise<void>;
    warn<T = any>(job: Job<T>): Promise<void>;
    debug<T = any>(job: Job<T>): Promise<void>;
    verbose<T = any>(job: Job<T>): Promise<void>;
    private getStateIcon;
}

export { BullMQLoggerService };
