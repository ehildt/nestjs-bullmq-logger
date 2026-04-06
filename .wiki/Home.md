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
import { BullMQLoggerModule } from "@ehildt/nestjs-bullmq-logger";
import { BullMQLoggerService } from "@ehildt/nestjs-bullmq-logger";
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

## State icons

The logger uses emoji icons to indicate job states in log output:

| State | Icon | Description |
|-------|------|-------------|
| completed | 🟢 | Job finished successfully |
| failed | ⚫ | Job failed |
| error | 🔴 | Error occurred |
| delayed | 🟠 | Job is delayed |
| waiting | 🟡 | Job is waiting |
| prioritized | 🔵 | Job is prioritized |
| active | 🟣 | Job is currently processing |
| waiting-children | 🟤 | Job is waiting for child jobs |
| paused | ⚪ | Queue is paused |
| stalled | 🔘 | Job has stalled |
| canceled | ⭕ | Job was canceled |
| unknown | 🚫 | Unknown state |
