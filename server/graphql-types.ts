import * as mongoose from 'mongoose';
import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLBoolean
} from 'graphql';

import { IRecipe, IUser, IAuthour } from './types';

const User = mongoose.model('User');
const Recipe = mongoose.model('Recipe');

// Define all reusible GraphQL types in here

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    email: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    _id: { type: GraphQLString }
  }
});

export const AuthorType: GraphQLObjectType = new GraphQLObjectType({
  name: 'AuthorType',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    recipes: {
      type: new GraphQLList(RecipeType),
      async resolve(parentValue: IAuthour) {
        return await Recipe.find({ author: parentValue._id });
      }
    }
  })
});

export const IngredientType = new GraphQLObjectType({
  name: 'Ingredient',
  fields: {
    amount: { type: GraphQLString },
    name: { type: GraphQLString }
  }
});

export const IngredientInput = new GraphQLInputObjectType({
  name: 'IngredientInput',
  fields: {
    amount: { type: GraphQLString },
    name: { type: GraphQLString }
  }
});

export const ImageType = new GraphQLObjectType({
  name: 'Image',
  fields: {
    small: { type: GraphQLString },
    medium: { type: GraphQLString },
    large: { type: GraphQLString }
  }
});

export const ImageInput = new GraphQLInputObjectType({
  name: 'ImageInput',
  fields: {
    medium: { type: GraphQLString },
    large: { type: GraphQLString }
  }
});

export const RecipeType = new GraphQLObjectType({
  name: 'Recipe',
  fields: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    ingredients: { type: new GraphQLList(IngredientType) },
    instructions: { type: new GraphQLList(GraphQLString) },
    image: { type: ImageType },
    author: {
      type: AuthorType,
      async resolve(parentValue: IRecipe) {
        const user = <IUser>await User.findById(parentValue.author);

        if (user == null) {
          throw new Error('Could not find author for this recipe');
        }

        return {
          _id: user._id,
          name: `${user.firstName} ${user.lastName.substring(0, 1)}`
        };
      }
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    slug: { type: GraphQLString }
  }
});

export const RecipeInput = new GraphQLInputObjectType({
  name: 'RecipeInput',
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    ingredients: { type: new GraphQLList(IngredientInput) },
    instructions: { type: new GraphQLList(GraphQLString) },
    author: { type: GraphQLID },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    slug: { type: GraphQLString }
  }
});

export const DeletedRecipe = new GraphQLObjectType({
  name: 'DeletedRecipe',
  fields: {
    deleted: { type: GraphQLBoolean },
    message: { type: GraphQLString }
  }
});
