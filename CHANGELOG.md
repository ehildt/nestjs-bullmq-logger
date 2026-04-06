# @ehildt/nestjs-bullmq-logger

## 1.2.1

### Patch Changes

- 707480d: Fix test expectations for state icons to match source code implementation

  - Updated "paused" state test to expect ⚪ icon (was incorrectly expecting ⭕)
  - Updated "unknown" state test to expect 🚫 icon (was incorrectly expecting ⚪)
  - Added missing test for "canceled" state (⭕ icon) to achieve 100% coverage
  - Updated wiki documentation to reflect correct icon mappings
  - Added concise JSDoc comments to service, module, constants, and schema

## 1.1.0

### Minor Changes

- 5b11d7d: refactor: consolidate exports to single entry point

  - remove barrel files (index.ts) from constants/, module/, schema/, service/
  - add single src/index.ts exporting all public APIs
  - rename BULLMQ_LOGGER to NESTJS_PINO_OPTIONS
  - move pino initialization from factory to onModuleInit lifecycle hook
  - add pino getter for accessing logger instance
  - fix tests: mock pino module and call onModuleInit
  - extend test coverage to 100%

## 1.0.1

### Patch Changes

- cf29dd3: fixed subpath exports

## 1.0.0

### Major Changes

- 4cd0d23: Initial release
