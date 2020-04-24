import Redis from 'ioredis';

Redis
  .Promise
  .onPossiblyUnhandledRejection(error =>
    console.log('REDIS ERROR', JSON.stringify(error))); // eslint-disable-line no-console

const {
  REDIS_URL,
} = process.env;

const redis = new Redis(REDIS_URL);

redis.on('error', error =>
  console.log('REDIS ERROR', JSON.stringify(error))); // eslint-disable-line no-console

export default redis;
