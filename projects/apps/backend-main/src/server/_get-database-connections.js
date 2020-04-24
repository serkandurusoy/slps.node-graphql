import { redis, mongodb, mysql } from '../databases';

const getDatabaseConnections = async () => {
  try {
    const redisConnection = await redis;
    const mongodbConnection = await mongodb;
    const mysqlConnection = await mysql;

    // TODO: This is placeholder code, change this to actual connection verification
    if (!redisConnection || !mongodbConnection || !mysqlConnection) throw new Error('could not verify database connections');

    return {
      redis: redisConnection,
      mongodb: mongodbConnection,
      mysql: mysqlConnection,
    };
  } catch (error) {
    console.log('DATABASE CONNECTION ERROR', JSON.stringify(error)); // eslint-disable-line no-console
    return {};
  }
};


export default getDatabaseConnections;
