import { GraphQLObjectType, GraphQLString } from 'graphql';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserType } from '../graphql-types';
import { IUser } from '../models/User';

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
        lastName: { type: GraphQLString },
        password: { type: GraphQLString },
        repeatPassword: { type: GraphQLString }
      },
      async resolve(
        _,
        { email, firstName, lastName, password, repeatPassword }
      ) {
        // Throw an error if the passwords do not match
        if (password !== repeatPassword) {
          throw new Error('Passwords do not match!');
        }

        // Prepare email and password
        email = email.toLowerCase();
        const hash = await bcrypt.hash(password, 10);

        // Return the new user
        return await new User({
          email,
          firstName,
          lastName,
          password: hash
        }).save();
      }
    },
    signIn: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(_, { email, password }) {
        // Find the user from the DB, return if there is none
        let user = await User.find({ email }).exec();
        if (user.length === 0) throw new Error(`Unable to find user!`);

        // Check that the password match
        // @ts-ignore
        const valid = await bcrypt.compare(password, user[0].password);

        if (!valid) {
          throw new Error(`Incorrect username or password!`);
        }

        // Sign the user in using JWT,

        // Reuturn the new user
        return user[0];
      }
    }
  }
});

export default mutation;
