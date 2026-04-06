---
"@ehildt/nestjs-bullmq-logger": patch
---

Fix test expectations for state icons to match source code implementation

- Updated "paused" state test to expect ⚪ icon (was incorrectly expecting ⭕)
- Updated "unknown" state test to expect 🚫 icon (was incorrectly expecting ⚪)
- Added missing test for "canceled" state (⭕ icon) to achieve 100% coverage
- Updated wiki documentation to reflect correct icon mappings
- Added concise JSDoc comments to service, module, constants, and schema
