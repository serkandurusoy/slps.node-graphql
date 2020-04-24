import { MongoClient } from 'mongodb';

const createConnection = async (url, options) => {
  try {
    const mongodb = await MongoClient.connect(url, options);
    return mongodb;
  } catch (error) {
    console.log('MONGODB ERROR', JSON.stringify(error)); // eslint-disable-line no-console
    return undefined;
  }
};

const {
  MONGO_URL,
} = process.env;

const mongodb = createConnection(MONGO_URL, {
  poolSize: 10,
  keepAlive: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  promiseLibrary: global.Promise,
});

export default mongodb;
