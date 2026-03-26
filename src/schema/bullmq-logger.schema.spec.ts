import { BullMQLoggerSchema } from "./bullmq-logger.schema.ts";

describe("BullMQLoggerSchema", () => {
  it("should validate a valid config", () => {
    const config = {
      level: "info",
      base: null,
      timestamp: Date.now,
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "yyyy-mm-dd HH:MM:ss.l",
          colorize: true,
          ignore: "pid,hostname",
        },
      },
    };

    const { error } = BullMQLoggerSchema.validate(config);
    expect(error).toBeUndefined();
  });

  it("should use default values when config is partial", () => {
    const config = {
      timestamp: Date.now,
      transport: {
        target: "pino-pretty",
        options: {},
      },
    };

    const { error, value } = BullMQLoggerSchema.validate(config);
    expect(error).toBeUndefined();
    expect(value.level).toBe("info");
    expect(value.base).toBeNull();
    expect(value.transport.target).toBe("pino-pretty");
    expect(value.transport.options.colorize).toBe(true);
    expect(value.transport.options.ignore).toBe("pid,hostname");
  });

  it("should reject invalid level", () => {
    const config = {
      level: "invalid",
      timestamp: Date.now,
      transport: {
        target: "pino-pretty",
        options: {},
      },
    };

    const { error } = BullMQLoggerSchema.validate(config);
    expect(error).toBeDefined();
    expect(error.message).toContain("level");
  });

  it("should reject invalid transport target", () => {
    const config = {
      timestamp: Date.now,
      transport: {
        target: "invalid",
        options: {},
      },
    };

    const { error } = BullMQLoggerSchema.validate(config);
    expect(error).toBeDefined();
    expect(error.message).toContain("target");
  });

  it("should require timestamp", () => {
    const config = {
      level: "info",
      transport: {
        target: "pino-pretty",
        options: {},
      },
    };

    const { error } = BullMQLoggerSchema.validate(config);
    expect(error).toBeDefined();
    expect(error.message).toContain("timestamp");
  });

  it("should require transport", () => {
    const config = {
      timestamp: Date.now,
    };

    const { error } = BullMQLoggerSchema.validate(config);
    expect(error).toBeDefined();
    expect(error.message).toContain("transport");
  });
});
