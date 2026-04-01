---
"@ehildt/nestjs-bullmq-logger": minor
---

refactor: consolidate exports to single entry point

- remove barrel files (index.ts) from constants/, module/, schema/, service/
- add single src/index.ts exporting all public APIs
- rename BULLMQ_LOGGER to NESTJS_PINO_OPTIONS
- move pino initialization from factory to onModuleInit lifecycle hook
- add pino getter for accessing logger instance
- fix tests: mock pino module and call onModuleInit
- extend test coverage to 100%
