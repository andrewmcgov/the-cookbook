import { GraphQLObjectType, GraphQLString } from 'graphql';

const mutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    testMutation: {
      type: GraphQLString,
      resolve(parentArgs, args, ctx) {
        console.log('Test GraphQL mutation called.');
        return 'Test GraphQL mutation successful.';
      }
    }
  }
});

export default mutation;
