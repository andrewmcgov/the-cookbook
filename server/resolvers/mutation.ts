import { GraphQLObjectType, GraphQLString } from 'graphql';
import * as mongoose from 'mongoose';

import { UserType } from '../graphql-types';

const User = mongoose.model('User');

const mutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    testMutation: {
      type: GraphQLString,
      resolve(parentArgs, args, ctx) {
        console.log('Test GraphQL mutation called.');
        return 'Test GraphQL mutation successful.';
      }
    },
    createUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString }
      },
      resolve(_, { email, firstName, lastName }) {
        return new User({ email, firstName, lastName }).save();
      }
    }
  }
});

export default mutation;
