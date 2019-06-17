import gql from 'graphql-tag';

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
      }
      createdAt
      updatedAt
      slug
    }
  }
`;
