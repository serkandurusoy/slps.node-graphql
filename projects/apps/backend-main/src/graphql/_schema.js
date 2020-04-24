import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './_type-defs';
import resolvers from './_resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
