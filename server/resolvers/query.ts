import { GraphQLObjectType, GraphQLString } from 'graphql';

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    testQuery: {
      type: GraphQLString,
      resolve(parentArgs, args, ctx) {
        console.log('Test query called.');
        return 'Test GraphQL query successful.';
      }
    }
  }
});

export default query;
