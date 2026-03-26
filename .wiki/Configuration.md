# Configuration

## Module options

```typescript
BullMQLoggerModule.registerAsync({
  global?: boolean;
  inject: Array<any>;
  useFactory: () => Promise<pino.LoggerOptions>;
})
```

## Example with pino-pretty

```typescript
BullMQLoggerModule.registerAsync({
  inject: [],
  useFactory: async () => ({
    level: "info",
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "yyyy-mm-dd HH:MM:ss.l",
        colorize: true,
      },
    },
  }),
})
```

## Validation schema

Import `BullMQLoggerSchema` for Joi validation:

```typescript
import { BullMQLoggerSchema } from "@ehildt/nestjs-bullmq-logger";
```
