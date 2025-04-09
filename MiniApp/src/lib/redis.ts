import Redis from "ioredis";

export const redisClient = new Redis({
  host: process.env.REDIS_URL || "localhost",
  port: parseInt(process.env.REDIS_TOKEN || "6379", 10),
});
