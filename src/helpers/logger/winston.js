const winston = require("winston");

const redisLogger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "Redis-Service" },
  transports: [new winston.transports.File({ filename: "redis-log" })],
});

if (process.env.NODE_ENV !== "production") {
  redisLogger.add(
    new winston.transports.Console({ format: winston.format.simple() })
  );
}

module.exports = { redisLogger };
