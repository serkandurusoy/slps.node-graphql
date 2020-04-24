import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { schema } from '../graphql';

const setupGraphqlServer = (app, databases, queues, cloudStorage) => {
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  const graphqlRequestParsers = [
    bodyParser.json({ limit: '50mb' }),
    bodyParser.urlencoded({ extended: true, limit: '50mb' }),
    bodyParser.text({ type: 'application/graphql', limit: '50mb' }),
    (req, res, next) => {
      if (req.is('application/graphql')) req.body = { query: req.body };
      next();
    },
  ];

  app.use('/graphql', ...graphqlRequestParsers, graphqlExpress(req => ({
    schema,
    context: {
      databases,
      queues,
      cloudStorage,
      currentUser: req.currentUser,
      appId: req.appId,
    },
  })));
};

export default setupGraphqlServer;
