import * as Redis from 'redis';

let redisClient;

(async () => {
  redisClient = Redis.createClient({
    port: 6379,
    host: '27.0.0.1',
  });

  redisClient.on('error', (err) => console.log('Redis Client Error', err));

  await redisClient.connect();
})();

redisClient.on('connect', () => {
  console.log('client connected to redis...');
});

//if the  client is disconnected

redisClient.on('end', () => {
  console.log('client disconnected to redis...');
});
export const setToken = async (key, value) => await redisClient.set(key, value);
export const deleteToken = async (key) => await redisClient.del(key);
export const getToken = async (key) => await redisClient.get(key);

// when we want to stop the redis or quit

process.on('SIGNT', () => {
  redisClient.quit();
});

export default redisClient;
