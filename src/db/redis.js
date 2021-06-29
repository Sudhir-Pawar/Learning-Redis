const redis = require("redis");
const { redisLogger } = require("../helpers/logger/winston");

let client = null;

const onConnect = () => {
  redisLogger.info("Redis connection established");
};
const onError = (error) => {
  redisLogger.error("Redis connection error Error: " + error);
};
const onReconnecting = () => {
  redisLogger.warn("Re-establishing connection with redis");
};
const onEnd = () => {
  redisLogger.warn("Redis connection closed");
};

function createConnection() {
  client = redis.createClient();
  client.on("connect", onConnect);
  client.on("error", onError);
  client.on("reconnecting", onReconnecting);
  client.on("end", onEnd);

  process.on("SIGINT", () => {
    client.quit(() => {
      redisLogger.warn("Redis connection closed through app termination");
    });
  });

  return client;
}

function getClient() {
  if (client) return client;
  return createConnection();
}

module.exports = { createConnection, getClient };
