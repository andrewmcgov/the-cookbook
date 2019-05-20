const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

// Define all reusible GraphQL types in here

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    email: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString }
  }
});
