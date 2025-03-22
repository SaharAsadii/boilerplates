import * as redis from "redis";
import { config } from "src/utils/constants";

export function redisInitializer() {
  try {
    const redisClient = redis.createClient({
      socket: {
        host: config.REDIS.REDIS_URI,
        port: +config.REDIS.REDIS_PORT
      }
    });
    redisClient.on("connect", function () {
      console.info("redis Connected!");
    });
    redisClient.on("error", (err) => {
      console.error("Redis Client Error", err);
    });
    redisClient.connect().then(() => {
      return redisClient;
    });
    return redisClient;
  } catch (error) {
    console.error("Redis General Error", error);
    throw new Error("Redis connection error");
  }
}
