

import { createClient } from 'redis';
import { config } from 'dotenv';
config();

const { REDIS_URL} = process.env;
export const redisClient = createClient({
  url: REDIS_URL
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client connected'));
redisClient.on('end', () => {
  console.log('client disconnected to redis...');
});

(async () => {
  await redisClient.connect();
})();

export const setToken = async (key, value) => await redisClient.set(key, value,'EX', 60 * 60 * 24);
export const deleteToken = async (key) => await redisClient.del(key);
export const getToken = async (key) => await redisClient.get(key);

export default redisClient;