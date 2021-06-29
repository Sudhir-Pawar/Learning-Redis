const redis = require("redis");

let client = null;

const onConnect = () => {
  console.log("Redis connection established");
};
const onError = (error) => {
  console.log("Redis connection error" + error);
};
const onReconnecting = () => {
  console.log("Re-establishing connection with redis");
};
const onEnd = () => {
  console.log("Redis connection closed");
};

function createConnection() {
  client = redis.createClient();
  client.on("connect", onConnect);
  client.on("error", onError);
  client.on("reconnecting", onReconnecting);
  client.on("end", onEnd);

  process.on("SIGINT", () => {
    client.quit(() => {
      console.log("Redis connection closed through app termination");
    });
  });

  return client;
}

function getClient() {
  if (client) return client;
  return createConnection();
}

module.exports = { createConnection, getClient };
