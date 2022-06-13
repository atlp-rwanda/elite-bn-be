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

// when we want to stop the redis or quit

process.on('SIGNT', () => {
  redisClient.quit();
});

export default redisClient;
