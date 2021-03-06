import gql from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      email
      firstName
      lastName
      _id
    }
  }
`;

export const GET_RECIPE_QUERY = gql`
  query GET_RECIPE_QUERY($slug: String) {
    getRecipe(slug: $slug) {
      _id
      title
      description
      tags
      ingredients {
        name
        amount
      }
      instructions
      image {
        small
        medium
        large
      }
      author {
        name
        _id
      }
      createdAt
      updatedAt
      slug
    }
  }
`;

export const GET_RECIPES_QUERY = gql`
  query GET_RECIPES_QUERY {
    getRecipes {
      _id
      title
      description
      tags
      ingredients {
        name
        amount
      }
      instructions
      image {
        small
        medium
        large
      }
      author {
        name
        _id
      }
      createdAt
      updatedAt
      slug
    }
  }
`;

export const GET_RECIPES_BY_AUTHOR = gql`
  query GET_RECIPES_BY_AUTHOR($author: String) {
    getRecipesByAuthor(author: $author) {
      _id
      title
      description
      tags
      slug
      image {
        medium
      }
    }
  }
`;
