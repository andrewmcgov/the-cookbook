import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import RecipeCard from '../RecipeCard';
import Error from '../Error';
import Page from '../Page';
import { IRecipe } from '../types';

const GET_RECIPES_QUERY = gql`
  query GET_RECIPIES {
    getRecipes {
      title
      description
      ingredients {
        name
        amount
      }
      instructions
      image
      author
      createdAt
      updatedAt
      slug
    }
  }
`;

function HomePage() {
  return (
    <Page>
      <Query query={GET_RECIPES_QUERY}>
        {({ data, loading, error }) => {
          if (loading) {
            return <h2>Loading...</h2>;
          }
          if (error) {
            return <Error error={error} />;
          }

          const recipes: IRecipe[] = data.getRecipes;

          return recipes.map(recipe => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ));
        }}
      </Query>
    </Page>
  );
}

export default HomePage;
