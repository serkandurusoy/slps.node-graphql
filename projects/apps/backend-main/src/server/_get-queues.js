import Redis from 'ioredis';
import Queue from 'bull';
import * as workers from '../workers';

const {
  REDIS_URL,
} = process.env;

const client = new Redis(REDIS_URL);
const subscriber = new Redis(REDIS_URL);

export const createQueue = (queueName, defaultRedis) => new Queue(queueName, {
  createClient(type) {
    switch (type) {
      case 'client': return client;
      case 'subscriber': return subscriber;
      default: return defaultRedis;
    }
  },
  prefix: 'queue:bull',
  settings: {
    lockDuration: 30000,
    stalledInterval: 30000,
    maxStalledCount: 1,
    guardInterval: 5000,
    retryProcessDelay: 5000,
  },
  limiter: {
    max: 1000,
    duration: 1000,
  },
});

const getQueues = (databases) => {
  try {
    const queues = Object.entries(workers).reduce((queuesBuilder, [name]) => ({
      ...queuesBuilder,
      [name]: createQueue(name, databases.redis),
    }), {});

    Object.entries(workers).forEach(([name, processor]) => {
      queues[name].on('error', (error) => {
        console.log('QUEUE ERROR', JSON.stringify(error)); // eslint-disable-line no-console
      });

      queues[name].on('stalled', (job) => {
        console.log('WORKER JOB HAS STALLED', JSON.stringify(job)); // eslint-disable-line no-console
      });

      queues[name].on('failed', (job, error) => {
        console.log('WORKER JOB HAS FAILED', JSON.stringify({ job, error })); // eslint-disable-line no-console
      });

      queues[name].process(processor(databases));
    });

    return queues;
  } catch (error) {
    console.log('WORKER CREATION ERROR', JSON.stringify(error)); // eslint-disable-line no-console
    return {};
  }
};


export default getQueues;
