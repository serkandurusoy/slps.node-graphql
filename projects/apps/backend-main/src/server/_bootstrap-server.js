import express from 'express';
import compression from 'compression';
import path from 'path';
import validateEnvironmentVariables from './_validate-environment-variables';
import getDatabaseConnections from './_get-database-connections';
import getQueues from './_get-queues';
import getCloudStorage from './_get-cloud-storage';
import startCronTasks from './_start-cron-tasks';
import setupSecurity from './_setup-security';
import rateLimiter from './_rate-limiter';
import parseToken from './_parse-token';
import setupGraphqlServer from './_setup-graphql-server';
import handleNotFound from './_handle-not-found';
import catchAllErrors from './_catch-all-errors';

(async () => {
  validateEnvironmentVariables();

  const databases = await getDatabaseConnections();

  const queues = getQueues(databases);

  const cloudStorage = getCloudStorage();

  startCronTasks(databases, queues);

  const app = express();

  app.use(compression());

  setupSecurity(app);

  app.enable('trust proxy');

  if (process.env.NODE_ENV_TARGET === 'production') {
    app.use(rateLimiter(databases.redis));
  }

  app.use(await parseToken(databases));

  app.use(express.static(path.join(__dirname, '../public')));

  setupGraphqlServer(app, databases, queues, cloudStorage);

  app.use(handleNotFound);

  app.use(catchAllErrors);

  app.listen(parseInt(process.env.PORT, 10) || 8080);
})();
