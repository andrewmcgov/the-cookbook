import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLInputObjectType
} from 'graphql';

// Define all reusible GraphQL types in here

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    email: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString }
  }
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

export const RecipeType = new GraphQLObjectType({
  name: 'Recipe',
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    ingredients: { type: new GraphQLList(IngredientType) },
    instructions: { type: new GraphQLList(GraphQLString) },
    image: { type: GraphQLString },
    author: { type: GraphQLID },
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
