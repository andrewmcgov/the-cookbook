import { GraphQLObjectType, GraphQLString } from 'graphql';
import * as mongoose from 'mongoose';

import { UserType } from '../graphql-types';

const User = mongoose.model('User');

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    testQuery: {
      type: GraphQLString,
      resolve(parentArgs, args, ctx) {
        console.log('Test query called.');
        return 'Test GraphQL query successful.';
      }
    },
    user: {
      type: UserType,
      // Describe the arguments that this query will recieve
      args: { email: { type: GraphQLString } },
      // Function to return the requested data, it is passed parentValue, args
      async resolve(_, { email }) {
        const user = await User.find({ email }).exec();
        return user[0];
      }
    }
  }
});

export default query;
