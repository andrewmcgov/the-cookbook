import { GraphQLObjectType, GraphQLString } from 'graphql';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { UserType } from '../graphql-types';
import { IUser } from '../types';

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
        { email, firstName, lastName, password, repeatPassword },
        ctx
      ) {
        // Throw an error if the passwords do not match
        if (password !== repeatPassword) {
          throw new Error('Passwords do not match!');
        }

        // Prepare email and password
        email = email.toLowerCase();
        const hash = await bcrypt.hash(password, 10);

        // Return the new user
        const user = <IUser>await new User({
          email,
          firstName,
          lastName,
          password: hash
        }).save();

        const token = jwt.sign({ _id: user._id }, process.env.APP_SECRET);

        ctx.cookies.set('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365
        });

        return user;
      }
    },
    signIn: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(_, { email, password }, ctx) {
        // Find the user from the DB, return if there is none
        const [user] = <IUser[]>await User.find({ email }).exec();
        if (!user) {
          throw new Error(`Unable to find user!`);
        }

        // Check if the password is correct
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new Error(`Incorrect username or password!`);
        }

        // Make the JWT token
        const token = jwt.sign({ _id: user._id }, process.env.APP_SECRET);

        // Set cookie to sign in the user
        ctx.cookies.set('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365
        });

        // Reuturn the signed in user
        return user;
      }
    },
    signOut: {
      type: GraphQLString,
      async resolve(_, __, ctx) {
        ctx.cookies.set('token');
        return 'You have logged out!';
      }
    }
  }
});

export default mutation;
