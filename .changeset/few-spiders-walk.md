---
"@ehildt/nestjs-bullmq-logger": patch
---

Fixed `TypeError: job.getState is not a function` error that occurred in BullMQ v5.x when job objects don't have the `getState()` method available (e.g., during error events in worker processors). The logger now safely checks if `getState` exists before calling it, falling back to inferring state from job properties (`failedReason` → "failed", `finishedOn` → "completed", `processedOn` → "active") or defaulting to "error" state when state cannot be determined.
