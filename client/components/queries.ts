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

export const GET_RECIPE = gql`
  query GET_RECIPE($slug: String) {
    getRecipe(slug: $slug) {
      title
      description
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
