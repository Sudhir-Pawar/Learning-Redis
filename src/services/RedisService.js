const { promisify } = require("util");
const { redisLogger } = require("../helpers/logger/winston");
const client = require("../db/redis").getClient();

const lrangeAsync = promisify(client.lrange).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);
const rpushAsync = promisify(client.rpush).bind(client);
const ltrimAsync = promisify(client.ltrim).bind(client);
const hmsetAsync = promisify(client.hmset).bind(client);

class RedisService {
  static async getList(list, start, stop) {
    try {
      return await lrangeAsync(list, start, stop);
    } catch (error) {
      redisLogger.error(error);
    }
  }

  static async getHashMap(hash) {
    try {
      return await hgetallAsync(hash);
    } catch (error) {
      redisLogger.error(error);
    }
  }

  static async listRPush(list, args) {
    try {
      if (Array.isArray(args)) {
        return await rpushAsync(list, ...args);
      }
      return await rpushAsync(list, args);
    } catch (error) {
      redisLogger.error(error);
    }
  }

  static async listLTrim(list, start, end) {
    try {
      return await ltrimAsync(list, start, end);
    } catch (error) {
      redisLogger.error(error);
    }
  }
  static async setHashMap(hash, args) {
    try {
      return await hmsetAsync(hash, ...args);
    } catch (error) {
      redisLogger.error(error);
    }
  }
}

module.exports = RedisService;
