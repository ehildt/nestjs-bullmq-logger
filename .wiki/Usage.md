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
