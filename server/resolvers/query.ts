import {GraphQLObjectType, GraphQLString, GraphQLList} from 'graphql';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';

import {UserType, RecipeType} from '../graphql-types';
import {IUser, IRecipe} from '../types';

const User = mongoose.model('User');
const Recipe = mongoose.model('Recipe');

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
      args: {email: {type: GraphQLString}},
      // Function to return the requested data, it is passed parentValue, args
      async resolve(_, {email}) {
        const [user] = <IUser[]>await User.find({email}).exec();
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
    },
    getRecipe: {
      type: RecipeType,
      args: {slug: {type: GraphQLString}},
      async resolve(_, {slug}, ctx) {
        const [recipe] = <IRecipe[]>await Recipe.find({slug}).exec();

        if (!recipe) {
          throw new Error('Could not find Recipe!');
        }

        return recipe;
      }
    },
    getRecipes: {
      type: new GraphQLList(RecipeType),
      async resolve(_, args, ctx) {
        const recipes = <IRecipe[]>await Recipe.find();
        return recipes.reverse();
      }
    },
    getRecipesByAuthor: {
      type: new GraphQLList(RecipeType),
      args: {author: {type: GraphQLString}},
      async resolve(_, {author}, ctx) {
        return <IRecipe[]>await Recipe.find({author}).exec();
      }
    },
    search: {
      type: new GraphQLList(RecipeType),
      args: {searchTerm: {type: GraphQLString}},
      async resolve(_, {searchTerm}, ctx) {
        const searchResults = <IRecipe[]>(
          await Recipe.find(
            {$text: {$search: searchTerm}},
            {score: {$meta: 'textScore'}}
          ).sort({score: {$meta: 'textScore'}})
        );

        return searchResults;
      }
    }
  }
});

export default query;
