import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import RecipeCard from '../RecipeCard';
import Error from '../Error';
import Page from '../Page';
import { IRecipe } from '../types';
import { GET_RECIPES_QUERY } from '../queries';

function HomePage() {
  return (
    <Page>
      <Query query={GET_RECIPES_QUERY}>
        {({ data, loading, error }) => {
          if (loading) {
            return null;
          }
          if (error) {
            return <Error error={error} />;
          }

          const recipes: IRecipe[] = data.getRecipes;

          return (
            <div className="recipe-card-loop">
              {recipes.map(recipe => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          );
        }}
      </Query>
    </Page>
  );
}

export default HomePage;
