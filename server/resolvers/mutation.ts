import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

interface Token {
  _id: mongoose.Types.ObjectId;
}

import {
  UserType,
  RecipeType,
  RecipeInput,
  IngredientType,
  IngredientInput,
  ImageInput,
  DeletedRecipe
} from '../graphql-types';

import { IUser, IRecipe, ICreateUser } from '../types';

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
        repeatPassword: { type: GraphQLString },
        signupKey: { type: GraphQLString }
      },
      async resolve(
        _,
        {
          email,
          firstName,
          lastName,
          password,
          repeatPassword,
          signupKey
        }: ICreateUser,
        ctx
      ) {
        // Check if they are eligible for an account
        if (signupKey !== process.env.SIGNUP_KEY) {
          throw new Error('You do not have a valid Signup Key!');
        }

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
        tags: { type: new GraphQLList(GraphQLString) },
        ingredients: { type: new GraphQLList(IngredientInput) },
        instructions: { type: new GraphQLList(GraphQLString) },
        image: { type: ImageInput }
      },
      async resolve(
        _,
        { title, description, tags, ingredients, instructions, image },
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
          tags,
          ingredients,
          instructions,
          image,
          author: userId,
          createdAt: Date.now()
        }).save();

        return recipe;
      }
    },
    editRecipe: {
      type: RecipeType,
      args: {
        slug: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        ingredients: { type: new GraphQLList(IngredientInput) },
        instructions: { type: new GraphQLList(GraphQLString) },
        image: { type: ImageInput }
      },
      async resolve(
        _,
        { slug, title, description, tags, ingredients, instructions, image },
        ctx
      ) {
        // Check that the user is logged in
        const token = await ctx.cookies.get('token');

        if (!token) {
          throw new Error('You must be logged in to create a recipe!');
        }
        // Get the Recipe from the database
        const recipe = <IRecipe>await Recipe.findOne({ slug }).exec();

        // Make sure this user is able to edit this recipe
        const userId = <Token>jwt.verify(token, process.env.APP_SECRET);

        if (userId._id != recipe.author) {
          throw new Error('You can only edit your own recipes!');
        }

        // Save the new recipe to the database
        const updatedRecipe = <IRecipe>await Recipe.findOneAndUpdate(
          { slug },
          {
            title,
            description,
            tags,
            ingredients,
            instructions,
            image,
            updatedAt: Date.now()
          }
        );

        // Return the new recipe
        return updatedRecipe;
      }
    },
    deleteRecipe: {
      type: DeletedRecipe,
      args: { slug: { type: GraphQLString } },
      async resolve(_, { slug }, ctx) {
        // Check that the user is logged in
        const token = await ctx.cookies.get('token');

        if (!token) {
          throw new Error('You must be logged in to delete a recipe!');
        }

        // Get the Recipe from the database
        const recipe = <IRecipe>await Recipe.findOne({ slug }).exec();

        // Make sure this user is able to edit this recipe
        const userId = <Token>jwt.verify(token, process.env.APP_SECRET);

        if (userId._id != recipe.author) {
          throw new Error('You can only delete your own recipes!');
        }

        // Delete the recipe from the DB
        await Recipe.findOneAndDelete({ slug });

        return {
          deleted: true,
          message: `Deleted recipe: ${recipe.title}`
        };
      }
    }
  }
});

export default mutation;
