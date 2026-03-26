# @ehildt/nestjs-bullmq-logger

A NestJS logger for BullMQ jobs powered by pino.

## Installation

```bash
npm install @ehildt/nestjs-bullmq-logger
```

## Peer Dependencies

```bash
npm install @nestjs/common bullmq joi pino pino-pretty
```

## Quick Start

```typescript
import { BullMQLoggerModule, BullMQLoggerService } from "@ehildt/nestjs-bullmq-logger";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    BullMQLoggerModule.registerAsync({
      inject: [],
      useFactory: async () => ({ level: "info" }),
    }),
  ],
})
export class AppModule {}
```

```typescript
@Processor("my-queue")
@Injectable()
export class MyProcessor extends WorkerHost {
  constructor(private readonly logger: BullMQLoggerService) {}

  async process(job: Job) {
    await this.logger.log(job);
  }
}
```

## Related

- [Usage](./Usage.md)
- [Configuration](./Configuration.md)
