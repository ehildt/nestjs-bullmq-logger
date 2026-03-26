import { DynamicModule } from '@nestjs/common';
import { LoggerOptions } from 'pino';

type LoggerConfigFactory = (...deps: any[]) => Promise<LoggerOptions>;
type BullMQLoggerModuleProps = {
    global?: boolean;
    inject: Array<any>;
    useFactory: LoggerConfigFactory;
};
declare class BullMQLoggerModule {
    static registerAsync(options: BullMQLoggerModuleProps): DynamicModule;
}

export { BullMQLoggerModule };
