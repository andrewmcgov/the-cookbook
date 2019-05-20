import { GraphQLObjectType, GraphQLString } from 'graphql';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';

import { UserType } from '../graphql-types';
import { IUser } from '../types';

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
    findUserByEmail: {
      type: UserType,
      // Describe the arguments that this query will recieve
      args: { email: { type: GraphQLString } },
      // Function to return the requested data, it is passed parentValue, args
      async resolve(_, { email }) {
        const [user] = <IUser[]>await User.find({ email }).exec();
        return user;
      }
    },
    currentUser: {
      type: UserType,
      async resolve(_, __, ctx) {
        const token = await ctx.cookies.get('token');

        if (token) {
          const id = jwt.verify(token, process.env.APP_SECRET);
          const user = <IUser>await User.findById(id);
          return user;
        }

        return null;
      }
    }
  }
});

export default query;
