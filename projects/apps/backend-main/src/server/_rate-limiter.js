import RateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';

const rateLimiter = redisInstance => new RateLimit({
  store: new RedisStore({
    expiry: 60, // seconds
    prefix: 'rateLimit',
    client: redisInstance,
  }),
  max: 180, // requests
  delayAfter: 60, // requests
  delayMs: 300, // milliseconds
  message: 'Too many api requests from this IP, please try again later.',
  headers: true,
});

export default rateLimiter;
