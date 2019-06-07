import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import {
  UserType,
  RecipeType,
  RecipeInput,
  IngredientType,
  IngredientInput
} from '../graphql-types';
import { IUser, IRecipe } from '../types';
import { resolve } from 'url';

const User = mongoose.model('User');
const Recipe = mongoose.model('Recipe');

const mutation = new GraphQLObjectType({
  // User Accounts ***************************************
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
        console.log('signout');
        ctx.cookies.set('token');
        return 'You have logged out!';
      }
    },
    // Recipes ********************************************
    createRecipe: {
      type: RecipeType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        ingredients: { type: new GraphQLList(IngredientInput) },
        instructions: { type: new GraphQLList(GraphQLString) },
        image: { type: GraphQLString }
      },
      async resolve(
        _,
        { title, description, ingredients, instructions, image },
        ctx
      ) {
        const token = await ctx.cookies.get('token');

        if (!token) {
          throw new Error('You must be logged in to create a recipe!');
        }

        const userId = jwt.verify(token, process.env.APP_SECRET);
        const recipe = await new Recipe({
          title,
          description,
          ingredients,
          instructions,
          image,
          author: userId,
          createdAt: Date.now()
        }).save();

        return recipe;
      }
    }
  }
});

export default mutation;
