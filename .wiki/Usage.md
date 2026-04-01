# Usage

## Register the module

```typescript
import { BullMQLoggerModule } from "@ehildt/nestjs-bullmq-logger";
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

## Use in processors

```typescript
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Job } from "bullmq";

import { BullMQLoggerService } from "@ehildt/nestjs-bullmq-logger";

@Processor("my-queue")
@Injectable()
export class MyProcessor extends WorkerHost {
  constructor(private readonly logger: BullMQLoggerService) {}

  async process(job: Job) {
    await this.logger.log(job);
  }
}
```

## Methods

- `log(job)` - Log job completion
- `error(job)` - Log job failure (includes failedReason, stacktrace)
- `warn(job)` - Log with queue metadata
- `debug(job)` - Log with job data and opts
- `verbose(job)` - Trace-level logging

## Example output

```
📦 my-queue(process-data) 🆔 ID-123 🔄 Attempts-1 🟢 completed
```

## State icons

The logger uses emoji icons to indicate job states:

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
| paused | ⭕ | Queue is paused |
| stalled | 🔘 | Job has stalled |
| unknown | ⚪ | Unknown state |
